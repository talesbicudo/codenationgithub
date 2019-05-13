import { client } from '../api';
import {ApolloClient} from 'apollo-client';

describe("API testing", () => {
    it('Creates a valid Apollo Client', () => {
        expect(client).toBeInstanceOf(ApolloClient);
    })


})