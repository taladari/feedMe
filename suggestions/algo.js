
const Profile = require('../models/Profile');
const SimilarRecipes = require('../models/SimilarRecipes');
const { intersectionLength, sumArray } = require('../suggestions/utils');


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

    return recommendations;
};

const findSimilarity = (profile, otherProfile) => {
    let commonRatingRecipes = [];
    let scores = [];
    const otherRatings = Object.keys(otherProfile.ratedRecipes);
    const ratings = Object.keys(profile.ratedRecipes);
    for (let recipe in ratings){
        if (otherRatings.indexOf(recipe) !== -1){
            commonRatingRecipes.push(recipe);
            scores.push([profile.ratedRecipes[recipe], otherProfile.ratedRecipes[recipe]]);
        }
    }
    let n = commonRatingRecipes.length;
    let sum1 = 0, sum2 = 0, powSum1 = 0, powSum2 = 0, ps = 0;
    for (let i in scores){
        sum1 += i[0];
        powSum1 += Math.pow(i[0], 2);
        sum2 += i[1];
        powSum2 += Math.pow(i[1], 2);
        ps += i[0] * i[1];
    }
    let num = n * ps - (sum1 * sum2);
    let den = Math.sqrt((n * powSum1 - Math.pow(sum1, 2)) * (n * powSum2 - Math.pow(sum2, 2)));
    return den === 0 ? 0 : num / den;
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
        for (let i = 0; i < 5; i++){
            const similar = await SimilarRecipes.findOne({ recipeId: ratedArr[i][0] });
            const similarIds = Object.keys(similar.similarRecipes);
            profiles = profiles.map(profile => {
                const ratedIds = Object.keys(profile.ratedRecipes);
                const intersection = intersectionLength(ratedIds, similarIds);
                return { 
                    user: profile.user, 
                    ratedRecipes: profile.ratedRecipes, 
                    numOfSimilar: intersection 
                };
            });

            profiles.sort((p1, p2) => p2.numOfSimilar - p1.numOfSimilar);

            selectedProfiles.push(profiles[0]);
        }
        return selectedProfiles;
    } catch (err) {
        console.log(err.message);
    }
};

const getSuggestions = async (profile, bound) => {
    const similarProfiles = await getSimilarProfiles(profile);
    const scores = findRelevantSuggestions(profile, similarProfiles, bound);
    return getRecipesRecommendations(profile, scores);
};


module.exports = getSuggestions;