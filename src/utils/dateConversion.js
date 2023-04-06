import moment from 'moment';

export const dateConversion=(dateString) =>{

    const formattedDate = moment(dateString).format('DD MMMM YYYY');
    return formattedDate;
}
