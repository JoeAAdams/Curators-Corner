import axios from "axios";

const harvardUniversity = axios.create({
    baseURL: "https://api.harvardartmuseums.org/",
});

const cleveland = axios.create({
    baseURL: "https://openaccess-api.clevelandart.org/api/",
});

export function searchMuseums(searchTerm) {
    const clevelandData = cleveland
        .get("artworks", {
            params: {
                limit: 40,
                q: searchTerm,
                has_image: 1,
            },
        })
        .then(({ data }) => {
            return data.data;
        });

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
}

function unifyData(clevelandData, harvardData) {
    const unifiedData = [];
    //sort data for cleveland art museum
    console.log(clevelandData);
    clevelandData.map((data) => {
        const imageURLs = data.alternate_images.map((image) => image.web.url);
        let artists = "";

        data.creators.length > 0 ?
        data.creators.forEach((creator, i) => {
            artists += creator.description;
            if (i < data.creators.length - 1) artists += ", ";
        }) : artists = "No credited arists"
        unifiedData.push({
            id: data.athena_id,
            title: data.title,
            description: data.description,
            images: imageURLs,
            creationDate: data.creationDate,
            source: "Cleveland Musuem",
            sourceLink: data.url,
            artists: artists,
        });
    });

    //sort data for harvard university
    console.log(harvardData);
    harvardData.map((data, i) => {
        console.log(i);
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
            currentLocation: data.department,
            source: "harvard",
            sourceLink: data.url,
            artists: artists,
        });
    });

    console.log(unifiedData);
    return unifiedData;
}
