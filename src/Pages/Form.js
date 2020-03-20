import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPlaylistAdd } from 'react-icons/md';
import { fetchFormControl } from "../Store/Actions/forms";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';

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
  controlWrapper: {
    marginTop: 20,
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
  const { register, handleSubmit, watch, errors, control } = useForm();

  const menuParams = useSelector(state => state.menu.route.menuParams);
  const controls = useSelector(state => state.forms.forms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFormControl(menuParams));
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
        <Control {...ctrl} chipData={chipData} register={register} Controller={Controller} control={control} key={ctrl.ControlName} style={{marginBottom: 10}}/>
    )
  }) : null
  console.log(gridData)

  return(
    <>
      <Grid container justify="space-between"  className={classes.actionWrapper}>
        <Grid item className={classes.bookmarkWrapper}>
          <MdPlaylistAdd className={classes.bookmarkIcon}/>
          <Typography variant="subtitle1">Add Bookmark</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <ActionButton controls={controls} handleSubmit={handleSubmit} setGridView={setGridView} chipData={chipData} gridData={gridData}/>
        </Grid>
      </Grid>
      <form>
        <Grid container className={classes.controlWrapper} style={{padding: treeChild ? 40 : '40px 100px'}}>
          {treeChild ? (
              <Grid item xs={4} container alignItems="center"  style={{transform: 'translateY(-20px)'}}>
                <Tree params={treeChild} setChipData={setChipData}/>
              </Grid>
          ) : null}
          <Grid item xs={treeChild ? 8 : 12}>
            {controlEl}
          </Grid>
        </Grid>
      </form>
      {
        gridView ? (
            <Grid item>
              <GridView/>
            </Grid>
        ) : null
      }
    </>
  );
};

export default Form;
