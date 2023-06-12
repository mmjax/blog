import {SelectList} from "react-native-dropdown-select-list";
import {useState} from "react";
import {View} from "react-native";


const DropDown =({

}) => {
    const [selected, setSelected] = useState('');

    const group_choice = [
        {key: 1, value: "Музыка"},
        {key: 2, value: "Игры"},
        {key: 3, value: "Фильмы"},
        {key: 4, value: "Юмор"}
    ];
    return(
        <View>
            <SelectList data={group_choice} setSelected={setSelected}></SelectList>
        </View>
    )
}
export default DropDown