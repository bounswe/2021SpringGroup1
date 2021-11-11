import moment from 'moment';
import tr from 'moment/locale/tr'
import en from 'moment/locale/en-gb'

// import {AsyncStorage} from 'react-native';

export const myDate = (date,language="tr") => {
    if(language == "en"){
        return moment(date).locale('en',en).format('MMMM Do YYYY, HH:mm');
    } else {
        return moment(date).locale('tr',tr).format('MMMM Do YYYY, HH:mm');
    }

}

export const myDateWithoutHour = (date) => {
    return moment(date).format('Do MMMM YYYY')
}

export const replaceTurkishWithEnglishChars = (str) => {
    return str.replace(/İ/g, "i")
            .replace(/Ğ/g, "g")
            .replace(/Ü/g, "u")
            .replace(/Ş/g, "s")
            .replace(/Ö/g, "o")
            .replace(/Ç/g, "c")
            .replace(/ı/g, "i")
            .replace(/ğ/g, "g")
            .replace(/ü/g, "u")
            .replace(/ş/g, "s")
            .replace(/ö/g, "o")
            .replace(/ç/g, "c");
}