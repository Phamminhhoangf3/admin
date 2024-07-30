import Swal from "sweetalert2";
import http from "~/common/http";

export const verifyDelete = ({
  name,
  endpoint,
  refetchList,
}) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const outerH4 = document.createElement("h4");
  outerH4.textContent = "Bạn có muốn xóa ";

  const innerH4 = document.createElement("span");
  innerH4.className = "text-primary";
  innerH4.textContent = name;

  outerH4.append(innerH4, " ?");

  Swal.fire({
    title: outerH4,
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
    showLoaderOnConfirm: true,
    // confirmButtonColor: "#ff6816",
    // cancelButtonColor: "#E5E5E5",
    preConfirm: async () => {
      try {
        const res = await http.delete(endpoint);
        return res;
      } catch (error) {
        Swal.showValidationMessage(`
              Request failed: ${error}
            `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log("🚀 ~ result:", result)
    if (result?.value?.status === 200) {
      swalWithBootstrapButtons.fire({
        title: "Xóa thành công!",
        icon: "success",
        confirmButtonText: "Đóng",
      });
      refetchList();
    } else if (!!result?.value) {
      swalWithBootstrapButtons.fire({
        title: "Xóa không thành công!",
        text: result.value?.data?.error?.errorMessage,
        icon: "error",
        confirmButtonText: "Đóng",
      });
    }
  });
};
