import axios from 'axios';
import toast from 'react-hot-toast';

// Get the list of all breeds
export const getBreeds = (setBreeds: Function) => {
    axios({
        method: 'get',
        url: 'https://frontend-take-home-service.fetch.com/dogs/breeds',
        withCredentials: true,
    })
        .then((res) => {
            setBreeds(
                res.data.map((element: String) => {
                    return { name: element };
                })
            );
        })
        .catch((err) => {
            
            console.log(err.response);
        });
};

// Gets the list of all dogsIds
export const getDogs = (
    {
        breeds = [{ name: 'null' }],
        zipCodes = [],
        ageMin = 0,
        ageMax = 0,
        size = 0,
        // sort = {}
    }: {
        breeds: Array<Object>;
        zipCodes: Array<String>;
        ageMin: Number;
        ageMax: Number;
        size: Number;
        // sort: Object;
    },
    setDogs: Function,
    setNextPrev: Function,
    setTotal: Function
    
) => {
    console.log('this is breeds', breeds);
    axios({
        method: 'get',
        url: 'https://frontend-take-home-service.fetch.com/dogs/search',
        withCredentials: true,
        params: {
            breeds: breeds,
            zipCodes: zipCodes,
            ageMin: ageMin,
            ageMax: ageMax,
            size: size,
            // sort: sort
        },
    })
        .then((res) => {
            // In case theres no one found, send a toast
            if(res.data.resultIds.length === 0){
                toast.error("No dogs found")
            }
            setTotal(res?.data?.total);
            setNextPrev({ next: res?.data?.next, prev: res?.data?.prev });
            getDogsObjects(res.data.resultIds, setDogs);
        })
        .catch((err) => {
            toast.error("Unauthorized site, login again.")
        });
};


//  Translate dogsIds to Objects
export const getDogsObjects = (arrIds: [], setDogs: Function) => {
    axios({
        method: 'post',
        url: 'https://frontend-take-home-service.fetch.com/dogs/',
        withCredentials: true,
        data: arrIds,
    })
        .then((res) => {
            setDogs(res.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
};

//  Translate dogsIds to Objects in this case only needs arr as parameter
export const getDogsObjects2 = async (arrIds: any[]) => {
    return await axios({
        method: 'post',
        url: 'https://frontend-take-home-service.fetch.com/dogs/',
        withCredentials: true,
        data: arrIds,
    });
};


// get httpOnly in order to login
export const registerSite = async (
    {
        name,
        email,
    }: {
        name: String;
        email: String;
    },
    goToFunction: Function,
    notify: Function
) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://frontend-take-home-service.fetch.com/auth/login',
            withCredentials: true,
            data: {
                name: name,
                email: email,
            },
        });
    
        if (response.status === 200) {
            goToFunction();
            
        }
    } catch (error) {
        notify('Please enter name and email');
    }
    
    
};


// get zipCode by city or state
export const searchLocations = async ({
    city,
    states,
}: {
    city: String;
    states: Array<String>;
}) => {
    return await axios({
        method: 'post',
        url: 'https://frontend-take-home-service.fetch.com/locations/search',
        withCredentials: true,
        data: {
            city: city,
            states: states,
            size: 100,
        },
    });
};

// Load next or prev page link
export const getPaginatedApplications = async (page: String) => {
    return await axios({
        method: 'get',
        url: `https://frontend-take-home-service.fetch.com${page}`,
        withCredentials: true,
    });
};


// Send the list of ids to get match
export const getMatch = async (Ids: any) => {
    return await axios({
        method: 'post',
        url: `https://frontend-take-home-service.fetch.com/dogs/match`,
        withCredentials: true,
        data: Ids
    });
};
