import React from 'react';


const SignIn=({onRouteChange})=>{
    return(
        <article className="br3 shadow-5 pb3 ba mt6  b--black-10 pl7 pr7  mw5 center" >  
            <main className="pa2 pr4 pl4 black-80 mt3 ml3 mr3 ">
                <form className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt2">
                            <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                            <input style={{width:300}} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="name" name="name"  id="name"/>
                        </div>

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
                    <input onClick={()=>onRouteChange('home')} className="b ph3 mb2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                    <div className="lh-copy ">
                        <p className='pb1 mb1'>Already have an account ?</p>
                        <p onClick={()=>onRouteChange('signIn')}  href="#0" className="f5 pointer pt1 mt1 b link dim black db">Sign in</p>
                        
                    </div>
                    
                </form>
            </main>
        </article>

    )
}
export default SignIn;
