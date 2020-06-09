import React from 'react';


const SignIn=({onRouteChange})=>{
    return(
        <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
            <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                <form className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt2">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input style={{width:300}} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input style={{width:300}}className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white " type="password" name="password"  id="password"/>
                        </div>
                        
                    </fieldset>
                    <div className="">
                    <input onClick={()=>onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f5 link dim black db">Register</a>
                        
                    </div>
                </form>
            </main>
        </article>

    )
}
export default SignIn;
