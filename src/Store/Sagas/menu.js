import axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../Actions/menu";

export function* fetchModulesMenu(action) {
    try {
        const menu = yield axios.get("http://localhost:8080/menu");
        const record = menu.data.recordset;

        //Formatting database into Modules
        const basic = [];
        const master = [];
        const modules = [];

        yield record.forEach(el => {
            if (el.ACode.startsWith("01")) basic.push(el);
            if (el.ACode.length === 4 && el.ACode.startsWith("02"))
                master.push(el);
            if (el.ACode.length === 4 && el.ACode.startsWith("03"))
                modules.push(el);
        });

      const basicMenu = yield basic.map(menu => {
            if(menu.ACode.length === 4) {
              const children = record.filter(
                rec =>
                    rec.ACode.startsWith(menu.ACode) && rec.ACode.length === 6
              );
              return { ...menu, children };
            }
            return null;
      }).filter(menu => menu);
      yield put(actions.storeBasicMenu(basicMenu));

      const masterMenu = yield master.map(menu => {
          if(menu.ACode.length === 4) {
            const children = record.filter(
              rec =>
                  rec.ACode.startsWith(menu.ACode) && rec.ACode.length === 6
            );
            return { ...menu, children };
          }
          return null;
      }).filter(menu => menu);
      yield put(actions.storeMasterMenu(masterMenu));

      const modulesMenu = yield modules.map(menu => {
          const reportExtension = `04${menu.ACode.slice(2, 4)}`;
          const formMenu = record.filter(
              rec =>
                  rec.ACode.startsWith(menu.ACode) && rec.ACode.length === 6
          );
          const reportMenu = record.filter(
              rec =>
                  rec.ACode.startsWith(reportExtension) &&
                  rec.ACode.length === 6
          );
          return { ...menu, formMenu: formMenu, reportMenu: reportMenu };
      });
      yield put(actions.storeModulesMenu(modulesMenu));

    } catch (err) {
        console.log(err);
    }
}

// function* fetchModulesMenu() {
//   yield axios.get("http://localhost:8080/menu").then(res => {
//     //Retrieving data from database
//     const record = res.data.recordset;

//     //Formatting database into Modules
//     const modules = record.filter(
//       el => el.ACode.length === 4 && el.ACode.startsWith("03")
//     );

//     const modulesMenu = modules.map(menu => {
//       const reportExtension = `04${menu.ACode.slice(2, 4)}`;
//       const formMenu = record.filter(
//         rec => rec.ACode.startsWith(menu.ACode) && rec.ACode.length === 6
//       );
//       const reportMenu = record.filter(
//         rec => rec.ACode.startsWith(reportExtension) && rec.ACode.length === 6
//       );
//       return { ...menu, formMenu: formMenu, reportMenu: reportMenu };
//     });
//   });
// }
