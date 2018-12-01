export class FormatDateValueConverter {
    toView(value) {
        let myDate = newDate(value);
        return myDate.toLocaleDateString() + "<br/>" + myDate.toLocalTimeString();
    }
}