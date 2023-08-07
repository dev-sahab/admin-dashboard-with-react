import swal from "sweetalert";


export const standardAlert = ({title, alert}, type = "success") => {
    swal(title, alert, type);
}

export const confirmAlert = () => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your permission is safe!");
        }
      });
}