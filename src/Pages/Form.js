import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPlaylistAdd } from 'react-icons/md';
import { initiateFetchFormControl } from "../Store/Actions/forms";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import { useForm, FormContext } from 'react-hook-form';

import Loading from '../Components/Util/Loading/Loading'
import Control from "../Components/Forms/Control";
import Tree from "../Components/Forms/Tree"
import ActionButton from "../Components/Forms/ActionButton";
import GridView from "../Components/Forms/GridView";

const useStyles = makeStyles(theme => ({
  actionWrapper : {
      backgroundColor: '#fff',
      height: 80
  },
  bookmarkWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      fontFamily: "'Open Sans', sans-serif",
      transition: 'background-color 0.5s',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#e1e1e1',
      },
  },
  bookmarkIcon: {
    marginRight: theme.spacing(1.5),
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0f236f'
  },
  contentWrapper: {
    position: 'relative',
    marginTop: 20,
    minHeight: 350,
    backgroundColor: '#fff',
    position: 'relative',
    '&::before': {
      content: "''",
      width: 0,
      height: 0,
      borderTop: '15px solid #0f236f',
      borderRight: '15px solid transparent',
      position: 'absolute',
      left: 0,
      top: 0,
    }
  },
}));

const Form = () => {
  const classes = useStyles();
  const hookFormMethods = useForm();

  const menuParams = useSelector(state => state.menu.route.menuParams);
  const isLoading = useSelector(state => state.forms.isFormLoading);
  const controls = useSelector(state => state.forms.forms);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initiateFetchFormControl(menuParams));
  }, [menuParams, dispatch]);

  const [chipData,setChipData] = useState([]);
  const [gridView,setGridView] = useState(false);

  let treeChild = null;
  let gridData = null;
  const controlEl = controls ? controls.map(ctrl => {
    if(ctrl.ControlName.startsWith("lbl")) return null;
    if(ctrl.ControlName.startsWith("Tre")) treeChild = ctrl.Params;
    if(ctrl.ControlName.startsWith("dgv")) gridData = ctrl
    return (
        <Control key={ctrl.ControlName} {...ctrl} chipData={chipData}/>
    )
  }) : null

  return(
    <FormContext {...hookFormMethods}> 
      <Grid container justify="space-between"  className={classes.actionWrapper}>
        <Grid item className={classes.bookmarkWrapper}>
          <MdPlaylistAdd className={classes.bookmarkIcon}/>
          <Typography variant="subtitle1">Add Bookmark</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <ActionButton controls={controls} setGridView={setGridView} chipData={chipData} gridData={gridData}/>
        </Grid>
      </Grid>
      <Grid item container className={classes.contentWrapper} style={{padding: treeChild ? 40 : '40px 100px'}}>
        {treeChild ? (
            <Grid item xs={4} container alignItems="center"  style={{transform: 'translateY(-20px)'}}>
              <Tree params={treeChild} setChipData={setChipData}/>
            </Grid>
        ) : null}
        <Grid item xs={treeChild ? 8 : 12}>
          {isLoading ? <Loading/> : controlEl}
        </Grid>
      </Grid>
      {
        gridView ? (
            <Grid item className={classes.contentWrapper} style={{marginBottom: 40}}>
              <GridView/>
            </Grid>
        ) : null
      }
    </FormContext>
  );
};

export default Form;
