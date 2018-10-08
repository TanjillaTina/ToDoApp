const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../models/user-model');


passport.serializeUser((user,done)=>{
    done(null,user.id);

});

///deserializing

passport.deserializeUser((id,done)=>{
    
    User.findById(id).then((user)=>{
        done(null,user);

    });
    


});
passport.use(
    new GoogleStrategy({
        //options for the google trategy
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret


    },(accessToken,refreshToken,profile,done)=>   {
              //passport callback function
              
              console.log("Callback Function Fired");
               //console.log(profile);
            //check if user already exists in our db
              User.findOne({googleId:profile.id}).then((currentUser)=>{
                  if(currentUser){
                     //already hv d user
                     console.log('user is '+currentUser);
                     //serializing the user
                     done(null,currentUser);
                  }
                  else{
                      //if nt, create new user in db
                       
                       
                        new User({
                            username:profile.displayName,
                            googleId:profile.id,
                            profileImgLink:profile._json.image.url
                           // profileImgLink:profile.image

                        }).save().then((newUser=>{
                            console.log('User Created '+newUser);
                            //res.render('/');

                            //again serializing

                            done(null,newUser);
                        }));
                        

                    }
              });


              


              })
           );



