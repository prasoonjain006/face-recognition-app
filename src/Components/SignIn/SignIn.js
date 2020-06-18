import React from 'react';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:'',
            showSignInWarning:false,
        }
    }

    /**
     * This function is called on each character input in email field 
     * sets email state
     * warning will not be displayed as long as user is typing email. 
     */
    onEmailChange =(event)=>{
        this.setState({
            signInEmail:event.target.value,
            showSignInWarning:false,
        });  
    }

    /**
     * This function is called on each character input in password field 
     * sets password field
     * warning will not be displayed as long as user is typing password. 
     */
    onPasswordChange =(event)=>{
        this.setState({
            signInPassword:event.target.value,
            showSignInWarning:false,
        });  
    }

    /**
     * This is the main function which is called when user hits the sign in button.
     */
    onSubmitSignIn=()=>{
        fetch('http://localhost:3001/signIn', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({                       /**sending the data as entered by user */
                email:this.state.signInEmail,
                password:this.state.signInPassword,
            })
        }).catch(err =>console.log("error sign in"))
            .then(response=> response.json())
            .then(user =>{
                if(user.id){                                /**Checking if user exists in database i.e user have id or not */
                    this.props.loadUser(user);              /**If valid user, redirect to home screen and load his data */
                    this.props.onRouteChange('home');
                }else{
                    this.setState({showSignInWarning:true}) /**Else show warning of incorrect credentials */
                }
            })
       
    }


    render(){
        const {onRouteChange}=this.props;
        return(
            /**
             * This is the Sign in Box containing fields for email and password input
             * The structure of signin form is taken from the tachyons and modified accordingly
             * Conditional statements are all used to show different warnings according to user input
             */
            <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
                <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 gold shadow-5 ph0 mh0">Sign In</legend>

                            {/**Email Field */}
                            <div className="mt2">
                                <label className="db fw6 b lh-copy f5" htmlFor="email-address">Email</label>
                                <input  onChange={this.onEmailChange} 
                                        style={{width:300}}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" 
                                        name="email-address"  id="email-address"
                                />
                            </div>

                            {/**password Field */}
                            <div className="mv3">
                                <label className="db fw6 lh-copy b f5" htmlFor="password">Password</label>
                                <input  onChange={this.onPasswordChange} 
                                        style={{width:300}}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " 
                                        type="password" name="password"  
                                        id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="mt0">

                        {/** If the user is not found in database, show warning*/}
                        {this.state.showSignInWarning===true
                            ? <p className='b red fw7 dib mt0 pt0' >Email or password is incorrect</p>
                            :<p></p>
                        }
                        
                        <input  onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                        />
                        </div>

                        {/** If user don't have an account show the option for registration*/}
                        <div className="lh-copy ">
                            <p className='pt3 p0 b'>Don't have an account ?</p>
                            <p onClick={()=>onRouteChange('register')}  href="#0" className="f4 pointer link b pt0 dim black db">Register Here</p>
                            
                        </div>
                    </div>
                </main>
            </article>

        )
    }
}
export default SignIn;
