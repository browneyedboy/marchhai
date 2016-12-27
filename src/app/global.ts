export var global = {
    userid : '',
    username : '',
    useremail : '',
    userphone : '',
    expire_date: 0,
    is_paid: 0,
    userdetail : function(userdata) {
        this.userid = userdata.id;
        this.username = userdata.username;
        this.useremail = userdata.email;
        this.userphone = userdata.phone_number;
        this.expire_date = userdata.expire_date;
        this.is_paid = userdata.is_paid;
    },
    userdetailget : function() {
        return {
        	id: this.userid,
	        username: this.username,
	        email: this.useremail,
	        phone: this.userphone,
            expire_date: this.expire_date,
            is_paid: this.is_paid,
        };
    }
};


