import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

import { setUrlPath } from "../Store/interface";
import { slugStringGenarator } from "../Constants/StringHelper";

const Home = () => {
  const modules = useSelector((state) => state.menu.allMenu.module);
  const key = Object.keys(modules)[0];
  const path =
    modules && modules[key] && slugStringGenarator(modules[key].AHead);

  const dispatch = useDispatch();
  dispatch(setUrlPath({ path }));

  return (
    //* The following route is the actual route type. Commenting it for developement Purpose
    // <Redirect to={`/dashboard/${path}`}/>
    <Redirect to={`/dashboard`} />
  );
};

export default Home;
