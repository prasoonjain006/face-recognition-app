import React from 'react';
import validator from 'validator';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:'',
            isEmailValid:false,
            showEmailWarning:false,
            showPasswordWarnings:true,
            sameID:false,
        }
    }

    /**
     * This function is called on each character input in name field 
     * sets name state 
     */
    onNameChange= (event)=>{
        this.setState({name:event.target.value});
    }

    /**
     * This function is called on each character input in email field 
     * sets email state
     * warning will not be displayed as long as user is typing email. 
     * Here, we also validate email 
     */
    onEmailChange =(event)=>{  
        if(validator.isEmail(this.state.email)){            /** If email valid proceed ahead */
            this.setState({
                isEmailValid:true,
                showEmailWarning:false,
                showNameWarning:false,
            })  
        }else{                                              /**  If email is not in correct format, show warning*/
            this.setState({isEmailValid:false})  
        }
        this.setState({email:event.target.value});         
    }

    /**
     * This function is called on each character input in password field 
     * sets password state
     * warning will be displayed as long as password length is less than 6. 
     */
    onPasswordChange =(event)=>{
        this.setState({password:event.target.value});
        this.state.password.length>=5
        ?   this.setState({showPasswordWarnings:false})
        :   this.setState({showPasswordWarnings:true})

    }


     /**
     * This is the main function which is called when user hits the Register in button.
     * It also Validate name, email and password.
     */
    onSubmitSignIn=()=>{
        if(this.state.isEmailValid){                            /** If email is valid */
            this.setState({showEmailWarning:false}) 
        if(this.state.showPasswordWarnings){                    /** If password is not valid , returns from the function */
                return;
            }else{
                if(this.state.name){                            /** If name field is NOT empty */
                    fetch('https://gentle-hollows-93077.herokuapp.com/register', {
                        method:'post',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify({
                            email:this.state.email,
                            password:this.state.password,
                            name:this.state.name,
                        })
                    })
                    /** 
                    * This status of 400 corresponds to email entered by user is already registered.
                    * So set sameID state true, and display error
                    */
                    .then(resp => resp.status===400 ? this.setState({sameID:true}) : resp) 
                    .then(response=> response.json()).catch(err=>console.log('same credentials'))
                    .then(user =>{
                    if(user){                                     /** If everything is correct then register user */
                            this.props.loadUser(user);                
                    this.props.onRouteChange('home');             /** Redirects to main page of the app */
                        }
                    })
                }else{                                           /** if name field is empty */
                    this.setState({showNameWarning:true})           
                }
            }
        }else{
            this.setState({showEmailWarning:true})              /** If email is not in the correct format */
        }
    }

    render(){
        const {onRouteChange}=this.props;
        return(
            /**
             * This is the Register Box containing fields for Name, email and password input
             * The structure of Register form is taken from the tachyons and modified accordingly
             * conditional statements are all used to show different warnings according to user input
             */
            <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
                <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 gold shadow-5 fw6 ph0 mh0">Register</legend>

                            {/**Name Field */}
                            <div className="mt2">
                                <label className="db fw6 b lh-copy f5" htmlFor="name">Name</label>
                                <input  style={{width:300}} 
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                        type="name" name="name"  
                                        id="name"
                                />
                            </div>

                            {/**Name Warning */}
                            {this.state.showNameWarning===true 
                                ?   <p className='b green ' >Enter Your name</p>
                                :<p></p>
                            }

                            {/**Email Field */}
                            <div className="mt2">
                                <label className="db fw6 b lh-copy f5" htmlFor="email-address">Email</label>
                                <input  style={{width:300}} 
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                        type="email" name="email-address"  
                                        id="email-address"
                                        required={true}
                                        autoComplete="off"
                                />
                            </div>

                             {/**Email Warning */}
                            {this.state.showEmailWarning===true 
                                ?   <p className='b green ' >Please Enter Email Correctly</p>
                                :<p></p>
                            }

                            {/**Password Field */}
                            <div className="mv3">
                                <label className="db b fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input  style={{width:300} }
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " 
                                        type="password" name="password" 
                                        id="password"
                                />
                            </div>

                            {/**Password Warning */}
                            {this.state.showPasswordWarnings===true 
                                ?   <p className='b green ' >Minimum password length should be 6</p>
                                :<p></p>
                            }
                        </fieldset>
                        <div className="">
                        <input  onClick={this.onSubmitSignIn}
                                className="b ph3 mb2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" 
                                value="Register"
                            />
                        </div>

                        {/**If user already registered show error */}
                        {this.state.sameID===true 
                            ?   <p className='b green ' >Already Registered, Kindly SignIn or register with different email-ID</p>
                            :<p></p>
                        }

                        {/** If user already have an account show the option for SignIn*/}
                        <div className="lh-copy ">
                            <p className='pb1 b mb1'>Already have an account ?</p>
                            <p onClick={()=>onRouteChange('signIn')}  href="#0" className="f4 pointer pt1 mt1 b link dim black db">Sign-In Here</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}
export default Register;
