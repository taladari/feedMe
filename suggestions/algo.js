
const Profile = require('../models/Profile');
const SimilarRecipes = require('../models/SimilarRecipes');
const { intersectionLength, sumArray, ALL, VEGAN, GLUTEN_FREE } = require('../suggestions/utils');
const Recipe = require('../models/Recipe');


const getRecipesRecommendations = (profile, scores) => {
    let recommendations = {};
    scores.forEach(score => {
        const otherRecipes = Object.keys(score[1].ratedRecipes);
        const recipes = Object.keys(profile.ratedRecipes);

        otherRecipes.forEach(recipe => {
            if (recipes.indexOf(recipe) !== -1/* change to === -1 */){
                let weight = score[0] * score[1].ratedRecipes[recipe];
                if (Object.keys(recommendations).indexOf(recipe) !== -1){
                    const oldVal = recommendations[recipe];
                    recommendations[recipe] = [oldVal[0] + score[0], [...oldVal[1], weight]];
                }
                else {
                    recommendations[recipe] = [score[0], [weight]];
                }
            }
        });
    });

    Object.keys(recommendations).forEach(rec => {
        const oldVal = recommendations[rec];
        recommendations[rec] = oldVal[0] === 0 ? 0 : sumArray(oldVal[1]) / oldVal[0];
    });

    return Object.keys(recommendations).sort((a, b) => {
        return recommendations[b] - recommendations[a] 
    }).reduce((prev, curr, i) => {
        prev[curr] = recommendations[curr]
        return prev
    }, {});
};

const findSimilarity = (profile, otherProfile) => {
    let commonRatingRecipes = [];
    let scores = [];
    const otherRatings = Object.keys(otherProfile.ratedRecipes);
    const ratings = Object.keys(profile.ratedRecipes);

    for(let i = 0; i < ratings.length; i++){
        const recipe = ratings[i];
        if (otherRatings.indexOf(recipe) !== -1){
            commonRatingRecipes.push(recipe);
            scores.push([profile.ratedRecipes[recipe], otherProfile.ratedRecipes[recipe]]);
        }
    }

    let n = commonRatingRecipes.length;
    let sum1 = 0, sum2 = 0, powSum1 = 0, powSum2 = 0, ps = 0;
    for (let i = 0; i < scores.length; i++){
        const entry = scores[i];
        sum1 += entry[0];
        powSum1 += Math.pow(entry[0], 2);
        sum2 += entry[1];
        powSum2 += Math.pow(entry[1], 2);
        ps += entry[0] * entry[1];
    }
    const cosineSimilarity = ps / (Math.sqrt(powSum1) * Math.sqrt(powSum2));
    return cosineSimilarity;
};

const findRelevantSuggestions = (profile, selectedProfiles, bound) => {
    let scores = [];

    selectedProfiles.forEach(prof => {
        if (profile.user !== prof.user){
            scores.push([findSimilarity(profile, prof), prof]);
        }
    });

    scores.sort((s1, s2) => s2[0] - s1[0]);
    return scores.slice(0, bound);
};

const getSimilarProfiles = async profile => {
    try {
        let ratedArr = [];
        for (let recipe in profile.ratedRecipes){
            ratedArr.push([recipe, profile.ratedRecipes[recipe]]);
        }

        ratedArr.sort((a, b) => a[1] - b[1]);

        let profiles = await Profile.find();
        let selectedProfiles = [];
        var numOfProfiles = 8;
        for (let i = 0; i < numOfProfiles; i++){
            const similar = await SimilarRecipes.findOne({ recipeId: ratedArr[i][0] });//find similar recipes
            //console.log(i,similar)
            const similarIds = Object.keys(similar.similarRecipes);//similar recipes keys(=id)
            //for each profile
            var comparedResult = profiles.map(profile => {
                const ratedIds = Object.keys(profile.ratedRecipes);//other users profile rated recipes id
                const intersection = intersectionLength(ratedIds, similarIds);//how many similar recipes this user rate
                return { 
                    user: profile.user, 
                    ratedRecipes: profile.ratedRecipes, 
                    numOfSimilar: intersection 
                };
            });

            comparedResult.sort((p1, p2) => p2.numOfSimilar - p1.numOfSimilar);//sort profiles by common rated recipes
            if(comparedResult[0].numOfSimilar > 1){ // check if users have common rated recipes
                selectedProfiles.push(comparedResult[0])
            }
            else{
                numOfProfiles++; 
            }
             
        }
        return selectedProfiles;
        
    } catch (err) {
        console.log(err.message);
    }
};

const filter = (pref, cat) => {
    for(let i in pref){
        if(pref[i] == cat){
            return true;
        }
    }
    return false;
};

const filterByPreference = async (recipes, pref) => {
    var filtered = {}
    for(let id in recipes){
        recipe = await Recipe.findById(id);
        for(let category in recipe.categories){
            if(filter(pref, recipe.categories[category])){
                filtered[recipe._id] = recipes[id];
                break; 
            }
        }
    }
    if(Object.keys(filtered).length === 0){
        return recipes;
    }
    return filtered;
};

const parsePreferences = (pref) => {
    switch(pref){
        case ALL:
            return [];
        case VEGAN:
            return ["Vegan", "Vegetarian"];
        case GLUTEN_FREE:
            return ["Wheat/Gluten-Free"];
    }
};

const getSuggestions = async (profile, bound, pref) => {
    const similarProfiles = await getSimilarProfiles(profile);
    console.log('Similar Profiles: ', similarProfiles);
    const scores = findRelevantSuggestions(profile, similarProfiles, bound);
     //console.log('Relevant Suggestions: ', scores);
    recommendations = getRecipesRecommendations(profile, scores);
    //console.log("Recommendation", recommendations)
    if(pref){
        return await filterByPreference(recommendations, pref)
    }
    return recommendations;
};

module.exports = {
    getSuggestions,
    parsePreferences
};