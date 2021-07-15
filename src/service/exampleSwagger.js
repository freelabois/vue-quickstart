import axios from "./axios";
import { ExampleService } from './api';

serviceOptions.axios = axios;

export const example = (params) => {
    return ExampleService.exampleRoute({
        body: params
    });
};