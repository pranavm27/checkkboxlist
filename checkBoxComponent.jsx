import React, { useState } from 'react';
import { CustomInput } from 'reactstrap';

export const CheckBoxList = (props) => {

    const data = props.options;
    if (!data) data = []

    const [checkboxLevels, setCheckboxLevels] = useState(data);

    
    let handleCheckElement = async event => {
        let check_box_levels = checkboxLevels;
        
        let target = event.target.id
        check_box_levels.forEach(item => {
            if (item.id == target) {
              if (event.target.checked == true) {
                item.completed = true
                item.completed_on = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" })
              }
              else {
                if (item.id != 0) {
                }
                item.completed = false
                item.completed_on = null
      
              }
              item.level.forEach(i => {
                if (event.target.checked == false)
                  i.completed_on = null
                else
                  if (!i.completed_on) {
                    i.completed_on = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" })
                    i.completed = event.target.checked;
                  }
                i.isChecked = event.target.checked;
                i.disabled = !event.target.checked;
      
              })
              item.isChecked = event.target.checked;
              if (check_box_levels[+item.id + 1] !== undefined)
                check_box_levels[+item.id + 1].disabled = !check_box_levels[+item.id + 1].disabled;
            }
          });
        prepareInputData(check_box_levels)
    };

    let handleCheckChieldElement = async (event) => {
        let check_box_levels = checkboxLevels;
        let target = event.target.id.split('-')
        let isAllChecked = true;
        check_box_levels[target[0]].level.forEach(item => {
            if (item.id == event.target.id) {
              if (event.target.checked == true) {
                item.completed = true
                item.completed_on = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" })
      
              } else {
                isAllChecked = false
                item.completed = false
                item.completed_on = null
              }
              item.isChecked = event.target.checked;
            } else {
              if(item.completed === false){
                isAllChecked = false
              }
            }
          });
          if (isAllChecked == true) {
            check_box_levels[target[0]].isChecked = true
            check_box_levels[target[0]].completed = true
            check_box_levels[target[0]].completed_on = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" })
          } else {
            check_box_levels[target[0]].isChecked = false
            check_box_levels[target[0]].completed = false
            check_box_levels[target[0]].completed_on = null
          }

        prepareInputData(check_box_levels)
    }

    let handleAllChecked = event => {
        let check_box_levels = checkboxLevels;
        check_box_levels.forEach(item => (item.isChecked = event.target.checked));
        this.setState({ check_box_levels: check_box_levels });
    };

    let setAllUnChecked = () => {
        let check_box_levels = checkboxLevels;
        check_box_levels.forEach(item => { item.isChecked = 'false'; item.disabled = true });
        check_box_levels[0].disabled = false;
        this.setState({ check_box_levels: check_box_levels });
    };

    let getLevelsObjs = () => {
        let check_box_levels = checkboxLevels
        if (check_box_levels.length) {
            return (
                check_box_levels.map((education_level, index) => {
                    return (<>
                        <CustomInput
                            key={index}
                            onChange={handleCheckElement}
                            checked={education_level.isChecked}
                            // disabled={education_level.disabled}
                            name={index}
                            className={"ml-1"}
                            type="checkbox"
                            id={education_level.id}
                            label={education_level.degree} />
                        {education_level.completed_on && <span className='color-purple' style={{ float: "right" }}> {"completed on - " + new Date(education_level.completed_on).toLocaleDateString("en-US", { timeZone: "America/New_York" }) || ""}</span>}

                        <br />
                        {education_level.level !== 0 && education_level.level.map((event_sub_level, i) => {
                            return (<>
                                <CustomInput
                                    key={i}
                                    checked={event_sub_level.isChecked}
                                    // disabled={event_sub_level.disabled}
                                    onChange={handleCheckChieldElement}
                                    name={index}
                                    className={"ml-5"}
                                    type="checkbox"
                                    id={event_sub_level.id}
                                    label={event_sub_level.degree}
                                />
                                {event_sub_level.completed_on && <span className='color-purple' style={{ float: "right" }}> {"completed on - " + new Date(event_sub_level.completed_on).toLocaleDateString("en-US", { timeZone: "America/New_York" }) || ""}</span>}
                                <br />
                            </>)
                        })}
                    </>
                    )
                })
            )
        } else {
            return <>No Input Data</>;
        }
    }

    const prepareInputData = (data) =>{
        if (!data)
            return <>No Input Data</>;

        let check_box_levels = data

        check_box_levels.forEach(item => {
            if (item.completed) {
              item.isChecked = true
              item.disabled = false
              if (check_box_levels[+item.id + 1] !== undefined)
                check_box_levels[+item.id + 1].disabled = false;
      
              item.level.forEach(level => {
                if (level.completed) {
                  level.isChecked = true
                } else {
                  level.isChecked = false
                }
                level.disabled = false
              })
            } else {
              item.isChecked = false
              item.disabled = (item.disabled === false) ? false : true
              item.level.forEach(level => {
                if(level.completed)
                  level.isChecked = true
                else
                  level.isChecked = false
                level.disabled = true
              })
            }
          })
        console.log (check_box_levels)
        setCheckboxLevels(check_box_levels)
        return 
    }

    return (
        getLevelsObjs()
    );
}