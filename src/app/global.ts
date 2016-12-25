export var global = {
    userid : '',
    username : '',
    useremail : '',
    userphone : '',
    userdetail : function(userdata) {
        this.userid = userdata.id;
        this.username = userdata.username;
        this.useremail = userdata.email;
        this.userphone = userdata.phone_number;
    },
    userdetailget : function() {
        return {
        	id: this.userid,
	        username: this.username,
	        email: this.useremail,
	        phone: this.userphone
        };
    }
};


