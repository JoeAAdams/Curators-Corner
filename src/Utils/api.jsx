import axios from "axios";

const harvardUniversity = axios.create({
    baseURL: "https://api.harvardartmuseums.org/",
});

const cleveland = axios.create({
    baseURL: "https://openaccess-api.clevelandart.org/api/",
});

const currentYear = new Date().getFullYear() + 1;

export function searchMuseums(
    searchTerm,
    createdBefore = currentYear,
    createdAfter = 0
) {
    console.log(createdAfter, createdBefore);
    const clevelandData = cleveland
        .get("artworks", {
            params: {
                limit: 40,
                q: searchTerm,
                has_image: 1,
                created_before: createdBefore,
                created_after: createdAfter,
            },
        })
        .then(({ data }) => {
            return data.data;
        });
    // if (createdAfter === 0 && createdBefore === currentYear) {
    //Harvard API can't filter by specific years
    const harvardData = harvardUniversity
        .get("object", {
            params: {
                apikey: import.meta.env.VITE_HARVARD_KEY,

                keyword: searchTerm,
                hasimage: 1,

                size: 40,
            },
        })
        .then(({ data }) => {
            return data.records;
        });

    return Promise.all([clevelandData, harvardData]).then((data) => {
        return unifyData(data[0], data[1]);
    });
    // } else {
    //     const harvardData = [];
    // }
}

function unifyData(clevelandData, harvardData) {
    const unifiedData = [];
    //sort data for cleveland art museum
    console.log("cleveland", clevelandData);
    clevelandData.map((data) => {
        const imageURLs = data.alternate_images.map((image) => image.web.url);
        let artists = "";

        data.creators.length > 0
            ? data.creators.forEach((creator, i) => {
                  artists += creator.description;
                  if (i < data.creators.length - 1) artists += ", ";
              })
            : (artists = "No credited arists");
        unifiedData.push({
            id: data.athena_id,
            title: data.title,
            description: data.description,
            images: imageURLs,
            creationDateEarliest: data.creation_date_earliest,
            creationDateLatest: data.creation_date_latest,
            source: "Cleveland Musuem",
            sourceLink: data.url,
            artists: artists,
        });
    });

    //sort data for harvard university
    console.log("harvard", harvardData);
    harvardData.map((data) => {
        const imageURLs = [];
        let artists = "";
        data.peoplecount > 0
            ? data.people.forEach((creator, i) => {
                  artists += `${creator.name} (${creator.culture}, ${creator.displaydate})`;
                  if (i < data.people.length - 1) artists += ", ";
              })
            : (artists = "No credited artists");

        if (data.images) {
            data.images.map((imageData) =>
                imageURLs.push(imageData.baseimageurl)
            );
        }
        unifiedData.push({
            id: data.id,
            title: data.title,
            images: imageURLs,
            creationDateEarliest: data.datebegin,
            creationDateLatest: data.dateend,
            source: "harvard",
            sourceLink: data.url,
            artists: artists,
        });
    });

    console.log(unifiedData);
    return unifiedData;
}
