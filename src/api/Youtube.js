import axios from 'axios';
import React, {Component} from 'react';

const API = 'AIzaSyBy-ctbOJntn7cppzTaXgB_kw95iBnCTZM'

//create will make easier GET requests
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
});
