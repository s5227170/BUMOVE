import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setpage } from "../../store/actions/UIActions";

import classes from "./stylesheets/Footer.module.scss";

const Footer: FC = () => {
    const dispatch = useDispatch();

    return (
        <section className={classes.section}>
            <div className={classes.links}>
                <div className={classes.about}>
                    <h4>About</h4>
                    <ul>
                        <li>How it works</li>
                        <li>Careers</li>
                        <li>Supporters</li>
                        <li>Platinum membership</li>
                        <li>Investors</li>
                        <li>Newsroom</li>
                        <li>Meet the team</li>
                    </ul>
                </div>
                <div className={classes.community}>
                    <h4>Community</h4>
                    <ul>
                        <li>Diversity</li>
                        <li>Accessibility</li>
                        <li>Associates</li>
                        <li>Referrals</li>
                        <li>Forums</li>
                    </ul>
                </div>
                <div className={classes.host}>
                    <h4>Host</h4>
                    <ul>
                        <li>Host your real property</li>
                        <li>Host an online experiene</li>
                        <li>Responsible hosting</li>
                        <li>Refer hosts</li>
                        <li>Resource centre</li>
                        <li>How to host</li>
                    </ul>
                </div>
                <div className={classes.support}>
                    <h4>Support</h4>
                    <ul>
                        <li>Contacts</li>
                        <li>Help centre</li>
                        <li>Contract cancellation</li>
                        <li>Support</li>
                        <li>Safety and security</li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className={classes.bottom}>
                <div className={classes.legal}>
                    <ul>
                        <li>Privacy</li>
                        <li>Terms</li>
                        <li>Sitemap</li>
                        <li>UK Modern Slavery Act</li>
                        <li>Company details</li>
                    </ul>
                </div>
                <div className={classes["social-media"]}>
                    <ul>
                        <li>
                            <i className="fa fa-facebook-square"></i>
                        </li>
                        <li>
                            <i className="fa fa-instagram"></i>
                        </li>
                        <li>
                            <i className="fa fa-twitter-square"></i>
                        </li>
                        <li>
                            <i className="fa fa-youtube"></i>
                        </li>
                        <li>
                            <i className="fa fa-snapchat-square"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Footer;
