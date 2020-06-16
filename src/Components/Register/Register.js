import React from 'react';
import validator from 'validator';

// validator.isEmail("dddd@gmil.ggg")?console.log("valid"):console.log("invalid");

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:'',
            isEmailValid:true,
        }
    }
    onNameChange= (event)=>{
        this.setState({name:event.target.value});
    }
    onEmailChange =(event)=>{
        this.setState({email:event.target.value});
        if(validator.isEmail(this.state.email)){
            console.log("Working correct")
        }else{
            console.log("try again");
        }
    }

    onPasswordChange =(event)=>{
        this.setState({password:event.target.value});
    }

    onSubmitSignIn=()=>{
        if(this.state.isEmailValid){
            fetch('http://localhost:3001/register', {
                method:'post',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email:this.state.email,
                    password:this.state.password,
                    name:this.state.name,
                })
            })
                .then(response=> response.json())
                .then(user =>{
                    if(user){
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })
        }else{
            console.log("lll");
        }
    }

    render(){
        const {onRouteChange}=this.props;
        return(
            <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
                <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt2">
                                <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                                <input  style={{width:300}} 
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                        type="name" name="name"  
                                        id="name"
                                />
                            </div>

                            <div className="mt2">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input  style={{width:300}} 
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                        type="email" name="email-address"  
                                        id="email-address"
                                        required={true}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input  style={{width:300} }
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " 
                                        type="password" name="password" 
                                        id="password"
                                />
                            </div>
                            
                        </fieldset>
                        <div className="">
                        <input  onClick={this.onSubmitSignIn}
                                className="b ph3 mb2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" 
                                value="Register"
                            />
                        </div>
                        {/* {this.state.isValid */}
                            <div className="lh-copy ">
                                <p className='pb1 mb1'>Already have an account ?</p>
                                <p onClick={()=>onRouteChange('signIn')}  href="#0" className="f5 pointer pt1 mt1 b link dim black db">Sign in</p>
                            </div>
                        {/* :<p></p>
                        } */}
                        
                        
                    </div>
                </main>
            </article>
        )
    }
}
export default Register;
