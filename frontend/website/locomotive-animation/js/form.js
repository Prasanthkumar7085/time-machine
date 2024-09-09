// Contact Form
if ($("#contactForm").length) {
  Vue.use(VeeValidate);
  new Vue({
      el: "#contactForm",
      data() {
          return {
              submitted: false,
              showSuccess: false,
              showError: false,
              leadData: {
                  email: "",
              },
              ownerData: {
                  email: "prasadarao04@gmail.com",
                  name: "Futureescape",
              },
              formData: {
                  form_title: "on Home page",
                  website_title: "Futureescape",
                  website_url: "",
              },
              emailSubject: "Lead from Media",
              successResponse:
                  "Thank You, We will get back to you at the earliest",
              errorResponse:
                  "Sorry! Unable to send your Message Now. Please try again",
              apiUrl: "https://z7inja5y3g.execute-api.ap-south-1.amazonaws.com/dev/notifications/email",
          };
      },
      methods: {
          async ContactForm() {
            this.showSuccess = false;
            this.showError = false;
            this.submitted = true;
            this.$validator.validateAll();
            if (!this.errors.any()) {
              let data = {
                leadData: this.leadData,
                ownerData: this.ownerData,
                formData: this.formData,
                email_subject: this.emailSubject,
                success_response: this.successResponse,
              };
              let response = await axios.post(this.apiUrl, data);
              if (response.data.success) {
                this.showSuccess = true;
                this.showError = false;
                this.loader = false;
                setTimeout(function () {
                  $("#suceess-message").css("opacity", "0");
                }, 3000);
                this.loader = false;
                this.leadData.email = "";
              } else {
                this.showError = true;
                this.loader - false;
              }
            } else {
              this.loader = false;
            }
          },
        },
  });
}
