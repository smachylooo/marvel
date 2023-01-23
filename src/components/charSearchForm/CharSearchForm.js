import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';


import useMarvelService from '../../services/MarvelService';
// import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss'

const CharSearchForm = () => {
    return (
        <section className='search'>
            <div className="search__inner">
                <h3 className='search__title'>Or find a character by name:</h3>
                <form className='search__form' action="">
                    <input type="text" placeholder='Enter name'/>
                    <button className='button'>FIND</button>
                </form>
            </div>
        </section>
    )
}

export default CharSearchForm;