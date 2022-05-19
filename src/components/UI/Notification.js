import classes from './Notification.module.css';

const Notification = (props) => {
    const status = props.status;

    let messageClass = '';

    if(status === 'error'){
        messageClass = classes.error;
    }
    if(status === 'success'){
        messageClass = classes.success;
    }

    const cssClasses = `${classes.notification} ${messageClass}`;
    return(
        <p className={cssClasses}>{props.message}</p>
    );
};
export default Notification;