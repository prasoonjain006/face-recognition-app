import React from 'react';


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange =(event)=>{
        this.setState({signInEmail:event.target.value});
    }
    onPasswordChange =(event)=>{
        this.setState({signInPassword:event.target.value});
    }
    onSubmitSignIn=()=>{
        fetch('http://localhost:3001/signIn', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword,
            })
        })
            .then(response=> response.json())
            .then(user =>{
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
       
    }


    render(){
        const {onRouteChange}=this.props;
        return(
            <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
                <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt2">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input  onChange={this.onEmailChange} 
                                        style={{width:300}}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" 
                                        name="email-address"  id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input  onChange={this.onPasswordChange} 
                                        style={{width:300}}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " 
                                        type="password" name="password"  
                                        id="password"
                                />
                            </div>
                            
                        </fieldset>
                        <div className="">
                        <input  onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                        />
                        </div>
                        <div className="lh-copy ">
                            <p className='pt3 p0 '>Don't have an account ?</p>
                            <p onClick={()=>onRouteChange('register')}  href="#0" className="f5 pointer link b pt0 dim black db">Register</p>
                            
                        </div>
                    </div>
                </main>
            </article>

        )
    }
}
export default SignIn;
