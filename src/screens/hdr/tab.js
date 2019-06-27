import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Dashboard from '../home/home'
import SignUp from '../userAuth/registration'
import DashboardIcon from '../../images/dashboard.png'
import Myrequest from '../home/myRequests'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 4 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    flexDirection:'column',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div  className={classes.root} style={{width:'100%'}} >
      {/* <AppBar position="static" color="default"> */}
        <Tabs
        style={{width:'100%',display:'flex',flex:'column'}}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab  label="Dashboard" icon={<img src={DashboardIcon} />} />
          <Tab  label="Pending Items" icon={<ShoppingBasket />} />
          <Tab  />
          {/* <Tab  />
          <Tab  /> */}
          
        </Tabs>
      {/* </AppBar> */}
      {value === 0 && <Dashboard/>}
      {value === 1 && <Myrequest/>}
      {/* {value === 2 && <TabContainer>Item Three</TabContainer>}
      {value === 3 && <TabContainer>Item Four</TabContainer>}
      {value === 4 && <TabContainer>Item Five</TabContainer>}
      {value === 5 && <TabContainer>Item Six</TabContainer>}
      {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
    </div>
  );
}