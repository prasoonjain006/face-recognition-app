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
    onNameChange= (event)=>{
        this.setState({name:event.target.value});
    }
    onEmailChange =(event)=>{  
        if(validator.isEmail(this.state.email)){
            console.log("Working correct")
            this.setState({
                isEmailValid:true,
                showEmailWarning:false,
                showNameWarning:false,
            })  
        }else{
            console.log("try again");
            this.setState({isEmailValid:false})  
        }
        this.setState({email:event.target.value});
    }
    onPasswordChange =(event)=>{
        this.setState({password:event.target.value});
        this.state.password.length>=5
        ?   this.setState({showPasswordWarnings:false})
        :   this.setState({showPasswordWarnings:true})

    }

    onSubmitSignIn=()=>{
        if(this.state.isEmailValid){
            this.setState({showEmailWarning:false})
            if(this.state.showPasswordWarnings){
                return;
            }else{
                if(this.state.name){
                    fetch('http://localhost:3001/register', {
                        method:'post',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify({
                            email:this.state.email,
                            password:this.state.password,
                            name:this.state.name,
                        })
                    })
                    .then(resp => resp.status===400 ? this.setState({sameID:true}) : resp)
                    .then(response=> response.json()).catch(err=>console.log('same credentials'))
                    .then(user =>{
                        if(user){
                            this.props.loadUser(user);
                            this.props.onRouteChange('home');
                        }
                    })
                }else{
                    this.setState({showNameWarning:true})
                }
            }
        }else{
            this.setState({showEmailWarning:true})
        }
    }

    render(){
        const {onRouteChange}=this.props;
        return(
            <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
                <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 gold shadow-5 fw6 ph0 mh0">Register</legend>
                            <div className="mt2">
                                <label className="db fw6 b lh-copy f5" htmlFor="name">Name</label>
                                <input  style={{width:300}} 
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                        type="name" name="name"  
                                        id="name"
                                />
                            </div>
                            {this.state.showNameWarning===true 
                                ?   <p className='b green ' >Enter Your name</p>
                                :<p></p>
                            }

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
                            {this.state.showEmailWarning===true 
                                ?   <p className='b green ' >Please Enter Email Correctly</p>
                                :<p></p>
                            }

                            <div className="mv3">
                                <label className="db b fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input  style={{width:300} }
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " 
                                        type="password" name="password" 
                                        id="password"
                                />
                            </div>
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
                        {this.state.sameID===true 
                            ?   <p className='b green ' >Already Registered, Kindly SignIn or register with different email-ID</p>
                            :<p></p>
                        }
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
