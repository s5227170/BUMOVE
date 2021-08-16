import axios, { AxiosResponse } from "axios";

import { Conversation, Rent } from "../store/types";

//axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_DB_URL;
axios.defaults.baseURL = "http://localhost:8080/graphql";

const responseBody = (response: AxiosResponse) => response.data;

// const requests = {
//     get: (url: string) => axios.post(url).then(responseBody),
//     post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//     put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//     del: (url: string) => axios.post(url).then(responseBody),
// };

// const toRent = {
//     list: (): Promise<Rent[]> => requests.get("/toRent.json"),
//     details: (id: string) => requests.get(`/toRent/${id}.json`),
//     create: (rent: Rent) => requests.post("/toRent.json", rent),
//     update: (id: string, rent: Rent ) => requests.put(`/toRent/${id}.json`, rent),
//     delete: (id: string) => requests.del(`/toRent/${id}.json`),
// };

const requests = {
    post: (graphqlQuery: any) => axios.post("", graphqlQuery, { withCredentials: true }).then(responseBody),
};


const authentication = {
    user: () => requests.post({
        query: `
    { user {
            _id
            name
            email
            avatar
            admin
            rents{
                _id
            }
            createdAt
            updatedAt
        }
      }
    `}),
    signIn: (email: string, password: string) => requests.post({
        query: `
    query ($email: String!, $password: String!) {
        signIn(email: $email, password: $password) 
    }
    `, variables: {
            email: email,
            password: password,
        }
    }),
    signUp: (email: string, password: string, name: string) => requests.post({
        query: `
    mutation UserSignUp($email: String!, $name: String!, $password: String!) {
        signUp(data: {email: $email, name: $name, password: $password}) {

            _id
            name
            email
            avatar
            admin
            rents{
                _id
            }
            createdAt
            updatedAt
          
        }
      }
    `, variables: {
            email: email,
            password: password,
            name: name,
        }
    }),
}

const toRent = {
    list: (): Promise<[]> => requests.post({
        query: `
     query {
        rents {rents {
                _id
                author {
                    _id
                }
                title
                type
                information
                location {
                    lat
                    lng
                }
                status
                price
                images
                imgnames
                rooms {
                    size
                    type
                }
                convos {
                    _id
                }
                createdAt
                updatedAt
            }
        }
    }
    `}),
    details: (id: string) => requests.post({
        query: `
    query rentDetails($id: String) {
        rent(id: $id) {
            rent {
                _id
                author {
                    _id
                }
                title
                type
                information
                location {
                    lat
                    lng
                }
                status
                price
                images
                imgnames
                rooms {
                    size
                    type
                }
                convos {
                    _id
                }
                createdAt
                updatedAt
            }
        }
    }
}
    `, variables: {
            id: id
        }
    }),
    create: (rent: Rent) => requests.post({
        query: `
        mutation rentCreate($title: String!, $type: String!, $information: String!, $location: LocationInput!, $status: String!, $price: Float!, $images: [String]!, $imgnames: [String]!, $rooms: [RoomInput]!) {
            createRent(rent: {title: $title, type: $type, information: $information, location: $location, status: $status, price: $price, images: $images, imgnames: $imgnames, rooms: $rooms}) {
                    _id
                    author {
                        _id
                    }
                    title
                    type
                    information
                    location {
                        lat
                        lng
                    }
                    status
                    price
                    images
                    imgnames
                    rooms {
                        size
                        type
                    }
                }
            }
        `, variables: {
            title: rent.title,
            type: rent.type,
            information: rent.information,
            location: rent.location,
            status: rent.status,
            price: rent.price,
            images: rent.images,
            imgnames: rent.imgnames,
            rooms: rent.rooms
        }
    }),
    update: (id: string, rent: Rent) => requests.post({
        query: `
        mutation rentUpdate($id: String!, $title: String!, $type: String!, $information: String!, $location: LocationInput!, $status: String!, $price: Float!, $images: [String]!, $imgnames: [String]!, $rooms: [RoomInput]!) {
            updateRent(id: $id, rent: {title: $title, type: $type, information: $information, location: $location, status: $status, price: $price, images: $images, imgnames: $imgnames, rooms: $rooms}) {
                _id
                    author {
                        _id
                    }
                    title
                    type
                    information
                    location {
                        lat
                        lng
                    }
                    status
                    price
                    images
                    imgnames
                    rooms {
                        size
                        type
                    }
            }
        }
        `, variables: {
            id: id,
            title: rent.title,
            type: rent.type,
            information: rent.information,
            location: rent.location,
            status: rent.status,
            price: rent.price,
            images: rent.images,
            imgnames: rent.imgnames,
            rooms: rent.rooms
        }
    }),
    delete: (id: string) => requests.post({
        query: `
        mutation {
            deleteRent(id: "${id}")
        }
        `}),

};

const conversation = {
    list: (): Promise<[]> => requests.post({
        query: `
    query conversations {
        conversations {
            _id
            name
            rentId{
                _id
            }
            home
            away
            texts{
                _id
            }
        }
    }
    `}),
    detailsById: (id: string) => requests.post({
        query: `
    query conversationDetails($id: String!) {
        conversation(id: $id) {
            conversation {
                _id
                name
                rentId{
                    _id
                }
                home
                away
                texts{
                    _id
                }
            }
        }
    }
    `, variables: {
            id: id,
        }
    }),
    detailsByRent: (rentId: string) => requests.post({
        query: `
    query conversationDetailsByRent($rentId: String!) {
        conversationByRent(rentId: $rentId) {
                _id
                name
                rentId{
                    _id
                }
                home
                away
                texts{
                    _id
                    author{
                        _id
                    }
                    receiver
                    content
                    conversation{
                        _id
                    }
                    createdAt
                    updatedAt
                }
        }
    }
    `, variables: {
            rentId: rentId,
        }
    }),
    create: (away: string, rentId: string) => requests.post({
        query: `
    mutation conversationCreate($away: String!, $rentId: String!) {
        createConversation(conversation: {away: $away, rentId: $rentId}) {
            _id
            name
            rentId{
                _id
            }
            home
            away
            texts{
                _id
            }
        }
    }
    `, variables: {
            rentId: rentId,
            away: away,
        }
    }),
    update: (id: string, texts: String[]) => requests.post({
        query: `
    mutation conversationUpdate($id: String!, $texts: [String]!) {
        updateConversation(id: $id, texts: $texts) {
            _id
            name
            rentId{
                _id
            }
            home
            away
            texts{
                _id
            }
        }
    }
    `, variables: {
            id: id,
            texts: texts,
        }
    }),
    delete: (id: string) => requests.post({
        query: `
    mutation {
        deleteConversation(id: "${id})
    }
    `}),
}

const texts = {
    list: (conversation: string): Promise<[]> => requests.post({
        query: `
    query loadTextsData($conversation: String!) {
        loadTexts(conversation: $conversation) {
            _id
            author
            receiver
            content
            conversation{
                _id
            }
            createdAt
            updatedAt
        }
    }
    `, variables: {
            conversation: conversation
        }
    }),
    send: (receiver: string, content: string, conversation: string) => requests.post({
        query: `
    mutation sendTextData($receiver: String!, $content: String!, $conversation: String!) {
        sendText(text: {receiver: $receiver, content: $content, conversation: $conversation}) {
            _id
            author{
                _id
            }
            receiver
            content
            conversation{
                _id
            }
            createdAt
            updatedAt
        }
    }
    `, variables: {
            content: content,
            receiver: receiver,
            conversation: conversation
        }
    }),
}

export default {
    toRent,
    conversation,
    authentication,
    texts,
};
