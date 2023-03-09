export function FormatFetchData(data) {

    // Data arrive 06/11/2022

    const arrayFormat = data.split('/');

    let todayFormat = '';

    const format = arrayFormat.reverse().forEach((element, index) => {

        if (element.length == 1) {
            element = 0 + element;
        }

        if (arrayFormat.length - 1 != index) {
            todayFormat += element + '/';
        } else {
            todayFormat += element
        }
    })

    // Data out 2022/11/06 -----> as "todayFormat"

    return todayFormat;
}