import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

const DatePicker = (props) => {
    const { control, errors } = useFormContext();
    const { darkMode, name, label, isTabControl} = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
                as={
                    <KeyboardDatePicker
                        clearable
                        autoOk
                        label={isTabControl ? label : ''}
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        size="small"
                        value = {new Date()}
                    />
                }
                control={control}
                name={name}
                defaultValue="data"
                error={errors && errors[name] ? true : false}
                helperText={errors[name] && '* Your Input is Required'}
                style={ darkMode ? {backgroundColor: '#313743'} : null}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
