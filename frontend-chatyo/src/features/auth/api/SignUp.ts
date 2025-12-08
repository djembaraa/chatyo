import instanceApi from "../../../shared/utils/axios";

export const signUp = async (data: FormData) =>
  instanceApi
    .post("/auth/sign-up", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
