import moment from 'moment';

export const timeago = (timestamp) => {
   const fecha = moment(timestamp);
   const timeAgo = moment(fecha).startOf('minute').fromNow();
    console.log(timeAgo)
     
}

