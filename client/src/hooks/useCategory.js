import { useState, useEffect } from "react";
import axios from 'axios';
import ConsoleHelperFrontend from "../ConsoleHelperFrontend";

export default function useCategory(){
    const [categories, setCategories]=useState([]);

    const getCategories=async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategories(data?.category)
            ConsoleHelperFrontend(categories)       
        } catch (error) {
            ConsoleHelperFrontend(error)
        }
    }
    useEffect(()=>{
        getCategories();
        // eslint-disable-next-line
    },[]);

    return categories;
}