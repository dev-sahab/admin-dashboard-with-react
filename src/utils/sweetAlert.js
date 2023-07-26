import swal from "sweetalert";


export const standardAlert = ({title, alert}, type = "success") => {
    swal(title, alert, type);
}