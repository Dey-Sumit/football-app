import React from 'react';
import './lineUp.scss'
import shirt from '../../assets/shirt.png'
import field from '../../assets/field.svg'
const LineUp = ({ startXI }) => {
    console.log(startXI);
    return (
        <div className="lineup">
            <img src={field} alt="football field" />
            <div className="lineup__players">
                <div className="lineup__goalkeeper">
                    {
                        // TODO  create a separate component
                        startXI.filter(player => player.pos === "G").map(player =>
                            <div className="lineup__player" >
                                <span>{player.number}</span>
                                <span>{player.player.split(" ")[player.player.split(" ").length - 1]}</span>

                            </div>
                        )
                    }
                </div>
                <div className="lineup__defence">
                    {
                        startXI.filter(player => player.pos === "D").map(player =>
                            <div className="lineup__player" ><span>{player.number}</span>
                                <span>{player.player.split(" ")[player.player.split(" ").length - 1]}</span> </div>
                        )
                    }


                </div>
                <div className="lineup__midfield">
                    {
                        startXI.filter(player => player.pos === "M").map(player =>
                            <div className="lineup__player" ><span>{player.number}</span></div>
                        )
                    }
                </div>
                <div className="lineup__forwards">
                    {
                        startXI.filter(player => player.pos === "F").map(player =>
                            <div className="lineup__player" ><span>{player.number}</span></div>
                        )
                    }
                </div>
            </div>
        </div >
    );
};

export default LineUp;