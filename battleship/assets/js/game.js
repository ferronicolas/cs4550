var ships_placed = false;

var Grid = React.createClass({

    getInitialState: function(){

        if (this.props.my_grid == "true" || this.props.my_grid == "false"){
           this.set_receive_message(); 
        }

        return {
            ships_already_placed: false,
            state_ship_5: 0,  // States: 0 - not painted, 1 - painting, 2 - already painted
            state_ship_4: 0,
            state_ship_3_1: 0,
            state_ship_3_2: 0,
            state_ship_2: 0,
            ship5_position: 'vertical',
            ship4_position: 'vertical',
            ship3_2_position: 'vertical',
            ship3_1_position: 'vertical',
            ship2_position: 'vertical',
        };
    },

    sendShips(){
        this.props.channel.push("my_ships", 
            {
                "game": this.props.game,
                "user": this.props.user, 
                "ships": 
                        {
                            "ship_5": this.state.ship_5, 
                            "ship_4": this.state.ship_4, 
                            "ship_3_1": this.state.ship_3_1,
                            "ship_3_2": this.state.ship_3_2, 
                            "ship_2": this.state.ship_2
                        }
            }
        );
    },

    logicShip(square_id, length_of_ship_so_far, length_of_ship, ship, color, id){
        if (length_of_ship_so_far == 1){
            if (square_id == ship[0]){
                console.log("The square you selected is invalid");
            }else{
                if ((square_id + 1 == ship[0] && (square_id + 1) % 10 != 0) ||
                    (square_id - 1 == ship[0] && (square_id - 1) % 10 != 9) ){
                    ship.push(square_id);
                    this.changeColor(square_id, color);
                    if (length_of_ship == 5){
                        this.setState({ship5_position: 'horizontal'});
                    }else if (length_of_ship == 4){
                        this.setState({ship4_position: 'horizontal'});
                    }else if (length_of_ship == 3 && id == 1){
                        this.setState({ship3_1_position: 'horizontal'});
                    }else if (length_of_ship == 3 && id == 2){
                        this.setState({ship3_2_position: 'horizontal'});
                    }else if (length_of_ship == 2){
                        this.setState({state_ship_2: 2, ships_already_placed: true});
                        ships_placed = true;
                        this.sendShips();
                    }
                }else if ((square_id + 10 == ship[0]) ||
                          (square_id - 10 == ship[0]) ){
                    ship.push(square_id);
                    this.changeColor(square_id, color);
                    if (length_of_ship == 5){
                        this.setState({ship5_position: 'vertical'});
                    }else if (length_of_ship == 4){
                        this.setState({ship4_position: 'vertical'});
                    }else if (length_of_ship == 3 && id == 1){
                        this.setState({ship3_1_position: 'vertical'});
                    }else if (length_of_ship == 3 && id == 2){
                        this.setState({ship3_2_position: 'vertical'});
                    }else if (length_of_ship == 2){
                        this.setState({state_ship_2: 2, ships_already_placed: true});
                        ships_placed = true;
                        this.sendShips();
                    }
                }else{
                    console.log("Invalid block!");
                }
            }       
        }else if (length_of_ship_so_far < length_of_ship) {
            var valid = true;
            var nextToAlreadyUsedBlock = false;
            var ship_position;

            if (length_of_ship == 5){
                ship_position = this.state.ship5_position;
            }else if (length_of_ship == 4){
                ship_position = this.state.ship4_position;
            }else if (length_of_ship == 3 && id == 1){
                ship_position = this.state.ship3_1_position;
            }else if (length_of_ship == 3 && id == 2){
                ship_position = this.state.ship3_2_position;
            }

            for (var i=0; i<length_of_ship_so_far; i++) {
                if (square_id == ship[i]){
                    valid = false; 
                    break;
                }
                if ((square_id + 1 == ship[i] && (square_id + 1) % 10 != 0 && ship_position == 'horizontal') || (square_id - 1 == ship[i] && square_id - 1 % 10 != 9 && ship_position == 'horizontal')  ||
                    (square_id + 10 == ship[i] && ship_position == 'vertical') ||
                    (square_id - 10 == ship[i] && ship_position == 'vertical') ) {
                    nextToAlreadyUsedBlock = true;
                }
            }
            if (valid && nextToAlreadyUsedBlock){
                ship.push(square_id);
                this.changeColor(square_id, color);
                if (length_of_ship_so_far == (length_of_ship - 1)){

                    if (length_of_ship == 5){
                        this.setState({state_ship_5: 2});
                    }else if (length_of_ship == 4){
                        this.setState({state_ship_4: 2});
                    }else if (length_of_ship == 3 && id == 1){
                        this.setState({state_ship_3_1: 2});
                    }else if (length_of_ship == 3 && id == 2){
                        this.setState({state_ship_3_2: 2});
                    }

                    console.log(length_of_ship + "-block-ship located!");
                }
            }else{
                console.log("The square you selected is invalid");
            }
        }
    },

    notInShip5(square_id){
        return this.notInPreviousShip(square_id, this.state.ship_5)
    },

    notInShip4(square_id){
        return this.notInPreviousShip(square_id, this.state.ship_4)
    },

    notInShip3_1(square_id){
        return this.notInPreviousShip(square_id, this.state.ship_3_1)
    },

    notInShip3_2(square_id){
        return this.notInPreviousShip(square_id, this.state.ship_3_2)
    },

    notInShip2(square_id){
        return this.notInPreviousShip(square_id, this.state.ship_2)
    },

    notInPreviousShip(square_id, array){
        var valid = true;
        for (var i=0; i < array.length; i++){
            if (array[i] == square_id){
                valid = false;
                break;
            }
        }
        return valid;
    },

    paint(square_id) {
        var colors = ['LightSalmon', 'LimeGreen', 'green', 'darkOrange', 'goldenRod'];
        if (this.state.state_ship_5 == 0){
            this.state.ship_5 = [square_id];
            this.changeColor(square_id, colors[0]);
            this.state.state_ship_5 = 1;
        }else if (this.state.state_ship_5 == 1){ 
            var length_of_ship = this.state.ship_5.length;
            this.logicShip(square_id, length_of_ship, 5, this.state.ship_5, colors[0], 0);
        }else if (this.state.state_ship_4 == 0){
            var valid = this.notInShip5(square_id);
            if (valid){
                this.state.ship_4 = [square_id];
                this.changeColor(square_id, colors[1]);
                this.state.state_ship_4 = 1;
            }else{
                console.log("The square you selected is invalid");
            }
        }else if (this.state.state_ship_4 == 1){
            var length_of_ship = this.state.ship_4.length;
            this.logicShip(square_id, length_of_ship, 4, this.state.ship_4, colors[1], 0);
        }else if (this.state.state_ship_3_1 == 0){
            var valid = this.notInShip5(square_id);
            if (valid){
                valid = this.notInShip4(square_id);
                if (valid){
                    this.state.ship_3_1 = [square_id];
                    this.changeColor(square_id, colors[2]);
                    this.state.state_ship_3_1 = 1;
                }else{
                    console.log("The square you selected is invalid");
                }
            }else{
                console.log("The square you selected is invalid");
            }
        }else if (this.state.state_ship_3_1 == 1){
            var length_of_ship = this.state.ship_3_1.length;
            this.logicShip(square_id, length_of_ship, 3, this.state.ship_3_1, colors[2], 1);
        }else if (this.state.state_ship_3_2 == 0){
            var valid = this.notInShip5(square_id);
            if (valid){
                valid = this.notInShip4(square_id);
                if (valid){
                    valid = this.notInShip3_1(square_id);
                    if (valid){
                        this.state.ship_3_2 = [square_id];
                        this.changeColor(square_id, colors[3]);
                        this.state.state_ship_3_2 = 1;
                    }else{
                        console.log("The square you selected is invalid");
                    }
                }else{
                    console.log("The square you selected is invalid");
                }
            }else{
                console.log("The square you selected is invalid");
            }
        }else if (this.state.state_ship_3_2 == 1){
            var length_of_ship = this.state.ship_3_2.length;
            this.logicShip(square_id, length_of_ship, 3, this.state.ship_3_2, colors[3], 2);
        }else if (this.state.state_ship_2 == 0){
            var valid = this.notInShip5(square_id);
            if (valid){
                valid = this.notInShip4(square_id);
                if (valid){
                    valid = this.notInShip3_1(square_id);
                    if (valid){
                        valid = this.notInShip3_2(square_id);
                        if (valid){
                            this.state.ship_2 = [square_id];
                            this.changeColor(square_id, colors[4]);
                            this.state.state_ship_2 = 1;
                        }else{
                            console.log("The square you selected is invalid");
                        }
                    }else{
                        console.log("The square you selected is invalid");
                    }
                }else{
                    console.log("The square you selected is invalid");
                }
            }else{
                console.log("The square you selected is invalid");
            }
        }else if (this.state.state_ship_2 == 1){
            var length_of_ship = this.state.ship_2.length;
            this.logicShip(square_id, length_of_ship, 2, this.state.ship_2, colors[4], 0);
        }else{
            alert("You've already positioned all the ships!");
        }
    },

    set_receive_message(){

        this.props.channel.on("attack", payload => {
            var my_grid = this.props.my_grid;
            if (my_grid == "true" && payload.user != this.props.user){ // Means that the other user sent the message
                var square_id = payload.square_id;
                switch (square_id){
                    case 0:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_0: 'failed'});
                        }else{
                            this.setState({hit_0: 'cross'});
                        }
                        break;
                    case 1:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_1: 'failed'});
                        }else{
                            this.setState({hit_1: 'cross'});
                        }
                        break;
                    case 2:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_2: 'failed'});
                        }else{
                            this.setState({hit_2: 'cross'});
                        }
                        break;  
                    case 3:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_3: 'failed'});
                        }else{
                            this.setState({hit_3: 'cross'});
                        }
                        break;
                    case 4:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_4: 'failed'});
                        }else{
                            this.setState({hit_4: 'cross'});
                        }
                        break;
                    case 5:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_5: 'failed'});
                        }else{
                            this.setState({hit_5: 'cross'});
                        }
                        break;
                    case 6:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_6: 'failed'});
                        }else{
                            this.setState({hit_6: 'cross'});
                        }
                        break;
                    case 7:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_7: 'failed'});
                        }else{
                            this.setState({hit_7: 'cross'});
                        }
                        break;
                    case 8:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_8: 'failed'});
                        }else{
                            this.setState({hit_8: 'cross'});
                        }
                        break;
                    case 9:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_9: 'failed'});
                        }else{
                            this.setState({hit_9: 'cross'});
                        }
                        break;

                    case 10:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_10: 'failed'});
                        }else{
                            this.setState({hit_10: 'cross'});
                        }
                        break;
                    case 11:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_11: 'failed'});
                        }else{
                            this.setState({hit_11: 'cross'});
                        }
                        break;
                    case 12:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_12: 'failed'});
                        }else{
                            this.setState({hit_12: 'cross'});
                        }
                        break;  
                    case 13:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_13: 'failed'});
                        }else{
                            this.setState({hit_13: 'cross'});
                        }
                        break;
                    case 14:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_14: 'failed'});
                        }else{
                            this.setState({hit_14: 'cross'});
                        }
                        break;
                    case 15:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_15: 'failed'});
                        }else{
                            this.setState({hit_15: 'cross'});
                        }
                        break;
                    case 16:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_16: 'failed'});
                        }else{
                            this.setState({hit_16: 'cross'});
                        }
                        break;
                    case 17:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_17: 'failed'});
                        }else{
                            this.setState({hit_17: 'cross'});
                        }
                        break;
                    case 18:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_18: 'failed'});
                        }else{
                            this.setState({hit_18: 'cross'});
                        }
                        break;
                    case 19:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_19: 'failed'});
                        }else{
                            this.setState({hit_19: 'cross'});
                        }
                        break;

                    case 20:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_20: 'failed'});
                        }else{
                            this.setState({hit_20: 'cross'});
                        }
                        break;
                    case 21:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_21: 'failed'});
                        }else{
                            this.setState({hit_21: 'cross'});
                        }
                        break;
                    case 22:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_22: 'failed'});
                        }else{
                            this.setState({hit_22: 'cross'});
                        }
                        break;  
                    case 23:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_23: 'failed'});
                        }else{
                            this.setState({hit_23: 'cross'});
                        }
                        break;
                    case 24:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_24: 'failed'});
                        }else{
                            this.setState({hit_24: 'cross'});
                        }
                        break;
                    case 25:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_25: 'failed'});
                        }else{
                            this.setState({hit_25: 'cross'});
                        }
                        break;
                    case 26:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_26: 'failed'});
                        }else{
                            this.setState({hit_26: 'cross'});
                        }
                        break;
                    case 27:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_27: 'failed'});
                        }else{
                            this.setState({hit_27: 'cross'});
                        }
                        break;
                    case 28:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_28: 'failed'});
                        }else{
                            this.setState({hit_28: 'cross'});
                        }
                        break;
                    case 29:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_29: 'failed'});
                        }else{
                            this.setState({hit_29: 'cross'});
                        }
                        break;

                    case 30:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_30: 'failed'});
                        }else{
                            this.setState({hit_30: 'cross'});
                        }
                        break;
                    case 31:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_31: 'failed'});
                        }else{
                            this.setState({hit_31: 'cross'});
                        }
                        break;
                    case 32:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_32: 'failed'});
                        }else{
                            this.setState({hit_32: 'cross'});
                        }
                        break;  
                    case 33:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_33: 'failed'});
                        }else{
                            this.setState({hit_33: 'cross'});
                        }
                        break;
                    case 34:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_34: 'failed'});
                        }else{
                            this.setState({hit_34: 'cross'});
                        }
                        break;
                    case 35:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_35: 'failed'});
                        }else{
                            this.setState({hit_35: 'cross'});
                        }
                        break;
                    case 36:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_36: 'failed'});
                        }else{
                            this.setState({hit_36: 'cross'});
                        }
                        break;
                    case 37:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_37: 'failed'});
                        }else{
                            this.setState({hit_37: 'cross'});
                        }
                        break;
                    case 38:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_38: 'failed'});
                        }else{
                            this.setState({hit_38: 'cross'});
                        }
                        break;
                    case 39:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_39: 'failed'});
                        }else{
                            this.setState({hit_39: 'cross'});
                        }
                        break;


                    case 40:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_40: 'failed'});
                        }else{
                            this.setState({hit_40: 'cross'});
                        }
                        break;
                    case 41:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_41: 'failed'});
                        }else{
                            this.setState({hit_41: 'cross'});
                        }
                        break;
                    case 42:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_42: 'failed'});
                        }else{
                            this.setState({hit_42: 'cross'});
                        }
                        break;  
                    case 43:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_43: 'failed'});
                        }else{
                            this.setState({hit_43: 'cross'});
                        }
                        break;
                    case 44:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_44: 'failed'});
                        }else{
                            this.setState({hit_44: 'cross'});
                        }
                        break;
                    case 45:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_45: 'failed'});
                        }else{
                            this.setState({hit_45: 'cross'});
                        }
                        break;
                    case 46:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_46: 'failed'});
                        }else{
                            this.setState({hit_46: 'cross'});
                        }
                        break;
                    case 47:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_47: 'failed'});
                        }else{
                            this.setState({hit_47: 'cross'});
                        }
                        break;
                    case 48:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_48: 'failed'});
                        }else{
                            this.setState({hit_48: 'cross'});
                        }
                        break;
                    case 49:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_49: 'failed'});
                        }else{
                            this.setState({hit_49: 'cross'});
                        }
                        break;


                    case 50:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_50: 'failed'});
                        }else{
                            this.setState({hit_50: 'cross'});
                        }
                        break;
                    case 51:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_51: 'failed'});
                        }else{
                            this.setState({hit_51: 'cross'});
                        }
                        break;
                    case 52:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_52: 'failed'});
                        }else{
                            this.setState({hit_52: 'cross'});
                        }
                        break;  
                    case 53:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_53: 'failed'});
                        }else{
                            this.setState({hit_53: 'cross'});
                        }
                        break;
                    case 54:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_54: 'failed'});
                        }else{
                            this.setState({hit_54: 'cross'});
                        }
                        break;
                    case 55:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_55: 'failed'});
                        }else{
                            this.setState({hit_55: 'cross'});
                        }
                        break;
                    case 56:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_56: 'failed'});
                        }else{
                            this.setState({hit_56: 'cross'});
                        }
                        break;
                    case 57:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_57: 'failed'});
                        }else{
                            this.setState({hit_57: 'cross'});
                        }
                        break;
                    case 58:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_58: 'failed'});
                        }else{
                            this.setState({hit_58: 'cross'});
                        }
                        break;
                    case 59:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_59: 'failed'});
                        }else{
                            this.setState({hit_59: 'cross'});
                        }
                        break;


                    case 60:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_60: 'failed'});
                        }else{
                            this.setState({hit_60: 'cross'});
                        }
                        break;
                    case 61:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_61: 'failed'});
                        }else{
                            this.setState({hit_61: 'cross'});
                        }
                        break;
                    case 62:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_62: 'failed'});
                        }else{
                            this.setState({hit_62: 'cross'});
                        }
                        break;  
                    case 63:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_63: 'failed'});
                        }else{
                            this.setState({hit_63: 'cross'});
                        }
                        break;
                    case 64:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_64: 'failed'});
                        }else{
                            this.setState({hit_64: 'cross'});
                        }
                        break;
                    case 65:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_65: 'failed'});
                        }else{
                            this.setState({hit_65: 'cross'});
                        }
                        break;
                    case 66:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_66: 'failed'});
                        }else{
                            this.setState({hit_66: 'cross'});
                        }
                        break;
                    case 67:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_67: 'failed'});
                        }else{
                            this.setState({hit_67: 'cross'});
                        }
                        break;
                    case 68:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_68: 'failed'});
                        }else{
                            this.setState({hit_68: 'cross'});
                        }
                        break;
                    case 69:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_69: 'failed'});
                        }else{
                            this.setState({hit_69: 'cross'});
                        }
                        break;

                    case 70:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_70: 'failed'});
                        }else{
                            this.setState({hit_70: 'cross'});
                        }
                        break;
                    case 71:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_71: 'failed'});
                        }else{
                            this.setState({hit_71: 'cross'});
                        }
                        break;
                    case 72:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_72: 'failed'});
                        }else{
                            this.setState({hit_72: 'cross'});
                        }
                        break;  
                    case 73:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_73: 'failed'});
                        }else{
                            this.setState({hit_73: 'cross'});
                        }
                        break;
                    case 74:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_74: 'failed'});
                        }else{
                            this.setState({hit_74: 'cross'});
                        }
                        break;
                    case 75:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_75: 'failed'});
                        }else{
                            this.setState({hit_75: 'cross'});
                        }
                        break;
                    case 76:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_76: 'failed'});
                        }else{
                            this.setState({hit_76: 'cross'});
                        }
                        break;
                    case 77:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_77: 'failed'});
                        }else{
                            this.setState({hit_77: 'cross'});
                        }
                        break;
                    case 78:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_78: 'failed'});
                        }else{
                            this.setState({hit_78: 'cross'});
                        }
                        break;
                    case 79:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_79: 'failed'});
                        }else{
                            this.setState({hit_79: 'cross'});
                        }
                        break;


                    case 80:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_80: 'failed'});
                        }else{
                            this.setState({hit_80: 'cross'});
                        }
                        break;
                    case 81:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_81: 'failed'});
                        }else{
                            this.setState({hit_81: 'cross'});
                        }
                        break;
                    case 82:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_82: 'failed'});
                        }else{
                            this.setState({hit_82: 'cross'});
                        }
                        break;  
                    case 83:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_83: 'failed'});
                        }else{
                            this.setState({hit_83: 'cross'});
                        }
                        break;
                    case 84:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_84: 'failed'});
                        }else{
                            this.setState({hit_84: 'cross'});
                        }
                        break;
                    case 85:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_85: 'failed'});
                        }else{
                            this.setState({hit_85: 'cross'});
                        }
                        break;
                    case 86:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_86: 'failed'});
                        }else{
                            this.setState({hit_86: 'cross'});
                        }
                        break;
                    case 87:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_87: 'failed'});
                        }else{
                            this.setState({hit_87: 'cross'});
                        }
                        break;
                    case 88:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_88: 'failed'});
                        }else{
                            this.setState({hit_88: 'cross'});
                        }
                        break;
                    case 89:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_89: 'failed'});
                        }else{
                            this.setState({hit_89: 'cross'});
                        }
                        break;


                    case 90:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_90: 'failed'});
                        }else{
                            this.setState({hit_90: 'cross'});
                        }
                        break;
                    case 91:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_91: 'failed'});
                        }else{
                            this.setState({hit_91: 'cross'});
                        }
                        break;
                    case 92:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_92: 'failed'});
                        }else{
                            this.setState({hit_92: 'cross'});
                        }
                        break;  
                    case 93:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_93: 'failed'});
                        }else{
                            this.setState({hit_93: 'cross'});
                        }
                        break;
                    case 94:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_94: 'failed'});
                        }else{
                            this.setState({hit_94: 'cross'});
                        }
                        break;
                    case 95:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_95: 'failed'});
                        }else{
                            this.setState({hit_95: 'cross'});
                        }
                        break;
                    case 96:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_96: 'failed'});
                        }else{
                            this.setState({hit_96: 'cross'});
                        }
                        break;
                    case 97:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_97: 'failed'});
                        }else{
                            this.setState({hit_97: 'cross'});
                        }
                        break;
                    case 98:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_98: 'failed'});
                        }else{
                            this.setState({hit_98: 'cross'});
                        }
                        break;
                    case 99:
                        if (this.notInShip5(square_id) && this.notInShip4(square_id) && this.notInShip3_1(square_id) &&
                            this.notInShip3_2(square_id) && this.notInShip2(square_id)){
                            this.setState({hit_99: 'failed'});
                        }else{
                            this.setState({hit_99: 'cross'});
                        }
                        break;
                }
            }else if (my_grid == "false" && payload.user == this.props.user){
                var square_id = payload.square_id;
                var hit_ship = payload.hit_ship
                switch (square_id){
                    case 0:
                        if (!hit_ship){
                            this.setState({hit_0: 'failed'});
                        }else{
                            this.setState({hit_0: 'cross'});
                        }
                        break;
                    case 1:
                        if (!hit_ship){
                            this.setState({hit_1: 'failed'});
                        }else{
                            this.setState({hit_1: 'cross'});
                        }
                        break;
                    case 2:
                        if (!hit_ship){
                            this.setState({hit_2: 'failed'});
                        }else{
                            this.setState({hit_2: 'cross'});
                        }
                        break;  
                    case 3:
                        if (!hit_ship){
                            this.setState({hit_3: 'failed'});
                        }else{
                            this.setState({hit_3: 'cross'});
                        }
                        break;
                    case 4:
                        if (!hit_ship){
                            this.setState({hit_4: 'failed'});
                        }else{
                            this.setState({hit_4: 'cross'});
                        }
                        break;
                    case 5:
                        if (!hit_ship){
                            this.setState({hit_5: 'failed'});
                        }else{
                            this.setState({hit_5: 'cross'});
                        }
                        break;
                    case 6:
                        if (!hit_ship){
                            this.setState({hit_6: 'failed'});
                        }else{
                            this.setState({hit_6: 'cross'});
                        }
                        break;
                    case 7:
                        if (!hit_ship){
                            this.setState({hit_7: 'failed'});
                        }else{
                            this.setState({hit_7: 'cross'});
                        }
                        break;
                    case 8:
                        if (!hit_ship){
                            this.setState({hit_8: 'failed'});
                        }else{
                            this.setState({hit_8: 'cross'});
                        }
                        break;
                    case 9:
                        if (!hit_ship){
                            this.setState({hit_9: 'failed'});
                        }else{
                            this.setState({hit_9: 'cross'});
                        }
                        break;

                    case 10:
                        if (!hit_ship){
                            this.setState({hit_10: 'failed'});
                        }else{
                            this.setState({hit_10: 'cross'});
                        }
                        break;
                    case 11:
                        if (!hit_ship){
                            this.setState({hit_11: 'failed'});
                        }else{
                            this.setState({hit_11: 'cross'});
                        }
                        break;
                    case 12:
                        if (!hit_ship){
                            this.setState({hit_12: 'failed'});
                        }else{
                            this.setState({hit_12: 'cross'});
                        }
                        break;  
                    case 13:
                        if (!hit_ship){
                            this.setState({hit_13: 'failed'});
                        }else{
                            this.setState({hit_13: 'cross'});
                        }
                        break;
                    case 14:
                        if (!hit_ship){
                            this.setState({hit_14: 'failed'});
                        }else{
                            this.setState({hit_14: 'cross'});
                        }
                        break;
                    case 15:
                        if (!hit_ship){
                            this.setState({hit_15: 'failed'});
                        }else{
                            this.setState({hit_15: 'cross'});
                        }
                        break;
                    case 16:
                        if (!hit_ship){
                            this.setState({hit_16: 'failed'});
                        }else{
                            this.setState({hit_16: 'cross'});
                        }
                        break;
                    case 17:
                        if (!hit_ship){
                            this.setState({hit_17: 'failed'});
                        }else{
                            this.setState({hit_17: 'cross'});
                        }
                        break;
                    case 18:
                        if (!hit_ship){
                            this.setState({hit_18: 'failed'});
                        }else{
                            this.setState({hit_18: 'cross'});
                        }
                        break;
                    case 19:
                        if (!hit_ship){
                            this.setState({hit_19: 'failed'});
                        }else{
                            this.setState({hit_19: 'cross'});
                        }
                        break;

                    case 20:
                        if (!hit_ship){
                            this.setState({hit_20: 'failed'});
                        }else{
                            this.setState({hit_20: 'cross'});
                        }
                        break;
                    case 21:
                        if (!hit_ship){
                            this.setState({hit_21: 'failed'});
                        }else{
                            this.setState({hit_21: 'cross'});
                        }
                        break;
                    case 22:
                        if (!hit_ship){
                            this.setState({hit_22: 'failed'});
                        }else{
                            this.setState({hit_22: 'cross'});
                        }
                        break;  
                    case 23:
                        if (!hit_ship){
                            this.setState({hit_23: 'failed'});
                        }else{
                            this.setState({hit_23: 'cross'});
                        }
                        break;
                    case 24:
                        if (!hit_ship){
                            this.setState({hit_24: 'failed'});
                        }else{
                            this.setState({hit_24: 'cross'});
                        }
                        break;
                    case 25:
                        if (!hit_ship){
                            this.setState({hit_25: 'failed'});
                        }else{
                            this.setState({hit_25: 'cross'});
                        }
                        break;
                    case 26:
                        if (!hit_ship){
                            this.setState({hit_26: 'failed'});
                        }else{
                            this.setState({hit_26: 'cross'});
                        }
                        break;
                    case 27:
                        if (!hit_ship){
                            this.setState({hit_27: 'failed'});
                        }else{
                            this.setState({hit_27: 'cross'});
                        }
                        break;
                    case 28:
                        if (!hit_ship){
                            this.setState({hit_28: 'failed'});
                        }else{
                            this.setState({hit_28: 'cross'});
                        }
                        break;
                    case 29:
                        if (!hit_ship){
                            this.setState({hit_29: 'failed'});
                        }else{
                            this.setState({hit_29: 'cross'});
                        }
                        break;

                    case 30:
                        if (!hit_ship){
                            this.setState({hit_30: 'failed'});
                        }else{
                            this.setState({hit_30: 'cross'});
                        }
                        break;
                    case 31:
                        if (!hit_ship){
                            this.setState({hit_31: 'failed'});
                        }else{
                            this.setState({hit_31: 'cross'});
                        }
                        break;
                    case 32:
                        if (!hit_ship){
                            this.setState({hit_32: 'failed'});
                        }else{
                            this.setState({hit_32: 'cross'});
                        }
                        break;  
                    case 33:
                        if (!hit_ship){
                            this.setState({hit_33: 'failed'});
                        }else{
                            this.setState({hit_33: 'cross'});
                        }
                        break;
                    case 34:
                        if (!hit_ship){
                            this.setState({hit_34: 'failed'});
                        }else{
                            this.setState({hit_34: 'cross'});
                        }
                        break;
                    case 35:
                        if (!hit_ship){
                            this.setState({hit_35: 'failed'});
                        }else{
                            this.setState({hit_35: 'cross'});
                        }
                        break;
                    case 36:
                        if (!hit_ship){
                            this.setState({hit_36: 'failed'});
                        }else{
                            this.setState({hit_36: 'cross'});
                        }
                        break;
                    case 37:
                        if (!hit_ship){
                            this.setState({hit_37: 'failed'});
                        }else{
                            this.setState({hit_37: 'cross'});
                        }
                        break;
                    case 38:
                        if (!hit_ship){
                            this.setState({hit_38: 'failed'});
                        }else{
                            this.setState({hit_38: 'cross'});
                        }
                        break;
                    case 39:
                        if (!hit_ship){
                            this.setState({hit_39: 'failed'});
                        }else{
                            this.setState({hit_39: 'cross'});
                        }
                        break;


                    case 40:
                        if (!hit_ship){
                            this.setState({hit_40: 'failed'});
                        }else{
                            this.setState({hit_40: 'cross'});
                        }
                        break;
                    case 41:
                        if (!hit_ship){
                            this.setState({hit_41: 'failed'});
                        }else{
                            this.setState({hit_41: 'cross'});
                        }
                        break;
                    case 42:
                        if (!hit_ship){
                            this.setState({hit_42: 'failed'});
                        }else{
                            this.setState({hit_42: 'cross'});
                        }
                        break;  
                    case 43:
                        if (!hit_ship){
                            this.setState({hit_43: 'failed'});
                        }else{
                            this.setState({hit_43: 'cross'});
                        }
                        break;
                    case 44:
                        if (!hit_ship){
                            this.setState({hit_44: 'failed'});
                        }else{
                            this.setState({hit_44: 'cross'});
                        }
                        break;
                    case 45:
                        if (!hit_ship){
                            this.setState({hit_45: 'failed'});
                        }else{
                            this.setState({hit_45: 'cross'});
                        }
                        break;
                    case 46:
                        if (!hit_ship){
                            this.setState({hit_46: 'failed'});
                        }else{
                            this.setState({hit_46: 'cross'});
                        }
                        break;
                    case 47:
                        if (!hit_ship){
                            this.setState({hit_47: 'failed'});
                        }else{
                            this.setState({hit_47: 'cross'});
                        }
                        break;
                    case 48:
                        if (!hit_ship){
                            this.setState({hit_48: 'failed'});
                        }else{
                            this.setState({hit_48: 'cross'});
                        }
                        break;
                    case 49:
                        if (!hit_ship){
                            this.setState({hit_49: 'failed'});
                        }else{
                            this.setState({hit_49: 'cross'});
                        }
                        break;


                    case 50:
                        if (!hit_ship){
                            this.setState({hit_50: 'failed'});
                        }else{
                            this.setState({hit_50: 'cross'});
                        }
                        break;
                    case 51:
                        if (!hit_ship){
                            this.setState({hit_51: 'failed'});
                        }else{
                            this.setState({hit_51: 'cross'});
                        }
                        break;
                    case 52:
                        if (!hit_ship){
                            this.setState({hit_52: 'failed'});
                        }else{
                            this.setState({hit_52: 'cross'});
                        }
                        break;  
                    case 53:
                        if (!hit_ship){
                            this.setState({hit_53: 'failed'});
                        }else{
                            this.setState({hit_53: 'cross'});
                        }
                        break;
                    case 54:
                        if (!hit_ship){
                            this.setState({hit_54: 'failed'});
                        }else{
                            this.setState({hit_54: 'cross'});
                        }
                        break;
                    case 55:
                        if (!hit_ship){
                            this.setState({hit_55: 'failed'});
                        }else{
                            this.setState({hit_55: 'cross'});
                        }
                        break;
                    case 56:
                        if (!hit_ship){
                            this.setState({hit_56: 'failed'});
                        }else{
                            this.setState({hit_56: 'cross'});
                        }
                        break;
                    case 57:
                        if (!hit_ship){
                            this.setState({hit_57: 'failed'});
                        }else{
                            this.setState({hit_57: 'cross'});
                        }
                        break;
                    case 58:
                        if (!hit_ship){
                            this.setState({hit_58: 'failed'});
                        }else{
                            this.setState({hit_58: 'cross'});
                        }
                        break;
                    case 59:
                        if (!hit_ship){
                            this.setState({hit_59: 'failed'});
                        }else{
                            this.setState({hit_59: 'cross'});
                        }
                        break;


                    case 60:
                        if (!hit_ship){
                            this.setState({hit_60: 'failed'});
                        }else{
                            this.setState({hit_60: 'cross'});
                        }
                        break;
                    case 61:
                        if (!hit_ship){
                            this.setState({hit_61: 'failed'});
                        }else{
                            this.setState({hit_61: 'cross'});
                        }
                        break;
                    case 62:
                        if (!hit_ship){
                            this.setState({hit_62: 'failed'});
                        }else{
                            this.setState({hit_62: 'cross'});
                        }
                        break;  
                    case 63:
                        if (!hit_ship){
                            this.setState({hit_63: 'failed'});
                        }else{
                            this.setState({hit_63: 'cross'});
                        }
                        break;
                    case 64:
                        if (!hit_ship){
                            this.setState({hit_64: 'failed'});
                        }else{
                            this.setState({hit_64: 'cross'});
                        }
                        break;
                    case 65:
                        if (!hit_ship){
                            this.setState({hit_65: 'failed'});
                        }else{
                            this.setState({hit_65: 'cross'});
                        }
                        break;
                    case 66:
                        if (!hit_ship){
                            this.setState({hit_66: 'failed'});
                        }else{
                            this.setState({hit_66: 'cross'});
                        }
                        break;
                    case 67:
                        if (!hit_ship){
                            this.setState({hit_67: 'failed'});
                        }else{
                            this.setState({hit_67: 'cross'});
                        }
                        break;
                    case 68:
                        if (!hit_ship){
                            this.setState({hit_68: 'failed'});
                        }else{
                            this.setState({hit_68: 'cross'});
                        }
                        break;
                    case 69:
                        if (!hit_ship){
                            this.setState({hit_69: 'failed'});
                        }else{
                            this.setState({hit_69: 'cross'});
                        }
                        break;

                    case 70:
                        if (!hit_ship){
                            this.setState({hit_70: 'failed'});
                        }else{
                            this.setState({hit_70: 'cross'});
                        }
                        break;
                    case 71:
                        if (!hit_ship){
                            this.setState({hit_71: 'failed'});
                        }else{
                            this.setState({hit_71: 'cross'});
                        }
                        break;
                    case 72:
                        if (!hit_ship){
                            this.setState({hit_72: 'failed'});
                        }else{
                            this.setState({hit_72: 'cross'});
                        }
                        break;  
                    case 73:
                        if (!hit_ship){
                            this.setState({hit_73: 'failed'});
                        }else{
                            this.setState({hit_73: 'cross'});
                        }
                        break;
                    case 74:
                        if (!hit_ship){
                            this.setState({hit_74: 'failed'});
                        }else{
                            this.setState({hit_74: 'cross'});
                        }
                        break;
                    case 75:
                        if (!hit_ship){
                            this.setState({hit_75: 'failed'});
                        }else{
                            this.setState({hit_75: 'cross'});
                        }
                        break;
                    case 76:
                        if (!hit_ship){
                            this.setState({hit_76: 'failed'});
                        }else{
                            this.setState({hit_76: 'cross'});
                        }
                        break;
                    case 77:
                        if (!hit_ship){
                            this.setState({hit_77: 'failed'});
                        }else{
                            this.setState({hit_77: 'cross'});
                        }
                        break;
                    case 78:
                        if (!hit_ship){
                            this.setState({hit_78: 'failed'});
                        }else{
                            this.setState({hit_78: 'cross'});
                        }
                        break;
                    case 79:
                        if (!hit_ship){
                            this.setState({hit_79: 'failed'});
                        }else{
                            this.setState({hit_79: 'cross'});
                        }
                        break;


                    case 80:
                        if (!hit_ship){
                            this.setState({hit_80: 'failed'});
                        }else{
                            this.setState({hit_80: 'cross'});
                        }
                        break;
                    case 81:
                        if (!hit_ship){
                            this.setState({hit_81: 'failed'});
                        }else{
                            this.setState({hit_81: 'cross'});
                        }
                        break;
                    case 82:
                        if (!hit_ship){
                            this.setState({hit_82: 'failed'});
                        }else{
                            this.setState({hit_82: 'cross'});
                        }
                        break;  
                    case 83:
                        if (!hit_ship){
                            this.setState({hit_83: 'failed'});
                        }else{
                            this.setState({hit_83: 'cross'});
                        }
                        break;
                    case 84:
                        if (!hit_ship){
                            this.setState({hit_84: 'failed'});
                        }else{
                            this.setState({hit_84: 'cross'});
                        }
                        break;
                    case 85:
                        if (!hit_ship){
                            this.setState({hit_85: 'failed'});
                        }else{
                            this.setState({hit_85: 'cross'});
                        }
                        break;
                    case 86:
                        if (!hit_ship){
                            this.setState({hit_86: 'failed'});
                        }else{
                            this.setState({hit_86: 'cross'});
                        }
                        break;
                    case 87:
                        if (!hit_ship){
                            this.setState({hit_87: 'failed'});
                        }else{
                            this.setState({hit_87: 'cross'});
                        }
                        break;
                    case 88:
                        if (!hit_ship){
                            this.setState({hit_88: 'failed'});
                        }else{
                            this.setState({hit_88: 'cross'});
                        }
                        break;
                    case 89:
                        if (!hit_ship){
                            this.setState({hit_89: 'failed'});
                        }else{
                            this.setState({hit_89: 'cross'});
                        }
                        break;


                    case 90:
                        if (!hit_ship){
                            this.setState({hit_90: 'failed'});
                        }else{
                            this.setState({hit_90: 'cross'});
                        }
                        break;
                    case 91:
                        if (!hit_ship){
                            this.setState({hit_91: 'failed'});
                        }else{
                            this.setState({hit_91: 'cross'});
                        }
                        break;
                    case 92:
                        if (!hit_ship){
                            this.setState({hit_92: 'failed'});
                        }else{
                            this.setState({hit_92: 'cross'});
                        }
                        break;  
                    case 93:
                        if (!hit_ship){
                            this.setState({hit_93: 'failed'});
                        }else{
                            this.setState({hit_93: 'cross'});
                        }
                        break;
                    case 94:
                        if (!hit_ship){
                            this.setState({hit_94: 'failed'});
                        }else{
                            this.setState({hit_94: 'cross'});
                        }
                        break;
                    case 95:
                        if (!hit_ship){
                            this.setState({hit_95: 'failed'});
                        }else{
                            this.setState({hit_95: 'cross'});
                        }
                        break;
                    case 96:
                        if (!hit_ship){
                            this.setState({hit_96: 'failed'});
                        }else{
                            this.setState({hit_96: 'cross'});
                        }
                        break;
                    case 97:
                        if (!hit_ship){
                            this.setState({hit_97: 'failed'});
                        }else{
                            this.setState({hit_97: 'cross'});
                        }
                        break;
                    case 98:
                        if (!hit_ship){
                            this.setState({hit_98: 'failed'});
                        }else{
                            this.setState({hit_98: 'cross'});
                        }
                        break;
                    case 99:
                        if (!hit_ship){
                            this.setState({hit_99: 'failed'});
                        }else{
                            this.setState({hit_99: 'cross'});
                        }
                        break; 
                }
            }
        })
    },

    attack(square_id) {
        this.props.channel.push("attack", {user: this.props.user, square_id: square_id, game: this.props.game});
    },        

    onSquareClicked(square_id) {
        var my_grid = this.props.my_grid;
        if (my_grid == "true"){
            this.paint(square_id); 
        }else{
            if (!ships_placed){
                alert("You must position your ships before attacking");
            }else{
                this.attack(square_id);
            }
        }
    },

    changeColor(square_id, color){
        switch (square_id){
            case 0:
                this.setState({bg_color_0: color});
                break;
            case 1:
                this.setState({bg_color_1: color});
                break;
            case 2:
                this.setState({bg_color_2: color});
                break;
            case 3:
                this.setState({bg_color_3: color});
                break;
            case 4:
                this.setState({bg_color_4: color});
                break;
            case 5:
                this.setState({bg_color_5: color});
                break;
            case 6:
                this.setState({bg_color_6: color});
                break;
            case 7:
                this.setState({bg_color_7: color});
                break;
            case 8:
                this.setState({bg_color_8: color});
                break;
            case 9:
                this.setState({bg_color_9: color});
                break;
            
            case 10:
                this.setState({bg_color_10: color});
                break;
            case 11:
                this.setState({bg_color_11: color});
                break;
            case 12:
                this.setState({bg_color_12: color});
                break;
            case 13:
                this.setState({bg_color_13: color});
                break;
            case 14:
                this.setState({bg_color_14: color});
                break;
            case 15:
                this.setState({bg_color_15: color});
                break;
            case 16:
                this.setState({bg_color_16: color});
                break;
            case 17:
                this.setState({bg_color_17: color});
                break;
            case 18:
                this.setState({bg_color_18: color});
                break;
            case 19:
                this.setState({bg_color_19: color});
                break;

            case 20:
                this.setState({bg_color_20: color});
                break;
            case 21:
                this.setState({bg_color_21: color});
                break;
            case 22:
                this.setState({bg_color_22: color});
                break;
            case 23:
                this.setState({bg_color_23: color});
                break;
            case 24:
                this.setState({bg_color_24: color});
                break;
            case 25:
                this.setState({bg_color_25: color});
                break;
            case 26:
                this.setState({bg_color_26: color});
                break;
            case 27:
                this.setState({bg_color_27: color});
                break;
            case 28:
                this.setState({bg_color_28: color});
                break;
            case 29:
                this.setState({bg_color_29: color});
                break;

            case 30:
                this.setState({bg_color_30: color});
                break;
            case 31:
                this.setState({bg_color_31: color});
                break;
            case 32:
                this.setState({bg_color_32: color});
                break;
            case 33:
                this.setState({bg_color_33: color});
                break;
            case 34:
                this.setState({bg_color_34: color});
                break;
            case 35:
                this.setState({bg_color_35: color});
                break;
            case 36:
                this.setState({bg_color_36: color});
                break;
            case 37:
                this.setState({bg_color_37: color});
                break;
            case 38:
                this.setState({bg_color_38: color});
                break;
            case 39:
                this.setState({bg_color_39: color});
                break;

            case 40:
                this.setState({bg_color_40: color});
                break;
            case 41:
                this.setState({bg_color_41: color});
                break;
            case 42:
                this.setState({bg_color_42: color});
                break;
            case 43:
                this.setState({bg_color_43: color});
                break;
            case 44:
                this.setState({bg_color_44: color});
                break;
            case 45:
                this.setState({bg_color_45: color});
                break;
            case 46:
                this.setState({bg_color_46: color});
                break;
            case 47:
                this.setState({bg_color_47: color});
                break;
            case 48:
                this.setState({bg_color_48: color});
                break;
            case 49:
                this.setState({bg_color_49: color});
                break;
            
            case 50:
                this.setState({bg_color_50: color});
                break;
            case 51:
                this.setState({bg_color_51: color});
                break;
            case 52:
                this.setState({bg_color_52: color});
                break;
            case 53:
                this.setState({bg_color_53: color});
                break;
            case 54:
                this.setState({bg_color_54: color});
                break;
            case 55:
                this.setState({bg_color_55: color});
                break;
            case 56:
                this.setState({bg_color_56: color});
                break;
            case 57:
                this.setState({bg_color_57: color});
                break;
            case 58:
                this.setState({bg_color_58: color});
                break;
            case 59:
                this.setState({bg_color_59: color});
                break;

            case 60:
                this.setState({bg_color_60: color});
                break;
            case 61:
                this.setState({bg_color_61: color});
                break;
            case 62:
                this.setState({bg_color_62: color});
                break;
            case 63:
                this.setState({bg_color_63: color});
                break;
            case 64:
                this.setState({bg_color_64: color});
                break;
            case 65:
                this.setState({bg_color_65: color});
                break;
            case 66:
                this.setState({bg_color_66: color});
                break;
            case 67:
                this.setState({bg_color_67: color});
                break;
            case 68:
                this.setState({bg_color_68: color});
                break;
            case 69:
                this.setState({bg_color_69: color});
                break;

            case 70:
                this.setState({bg_color_70: color});
                break;
            case 71:
                this.setState({bg_color_71: color});
                break;
            case 72:
                this.setState({bg_color_72: color});
                break;
            case 73:
                this.setState({bg_color_73: color});
                break;
            case 74:
                this.setState({bg_color_74: color});
                break;
            case 75:
                this.setState({bg_color_75: color});
                break;
            case 76:
                this.setState({bg_color_76: color});
                break;
            case 77:
                this.setState({bg_color_77: color});
                break;
            case 78:
                this.setState({bg_color_78: color});
                break;
            case 79:
                this.setState({bg_color_79: color});
                break;

            case 80:
                this.setState({bg_color_80: color});
                break;
            case 81:
                this.setState({bg_color_81: color});
                break;
            case 82:
                this.setState({bg_color_82: color});
                break;
            case 83:
                this.setState({bg_color_83: color});
                break;
            case 84:
                this.setState({bg_color_84: color});
                break;
            case 85:
                this.setState({bg_color_85: color});
                break;
            case 86:
                this.setState({bg_color_86: color});
                break;
            case 87:
                this.setState({bg_color_87: color});
                break;
            case 88:
                this.setState({bg_color_88: color});
                break;
            case 89:
                this.setState({bg_color_89: color});
                break;

            case 90:
                this.setState({bg_color_90: color});
                break;
            case 91:
                this.setState({bg_color_91: color});
                break;
            case 92:
                this.setState({bg_color_92: color});
                break;
            case 93:
                this.setState({bg_color_93: color});
                break;
            case 94:
                this.setState({bg_color_94: color});
                break;
            case 95:
                this.setState({bg_color_95: color});
                break;
            case 96:
                this.setState({bg_color_96: color});
                break;
            case 97:
                this.setState({bg_color_97: color});
                break;
            case 98:
                this.setState({bg_color_98: color});
                break;
            case 99:
                this.setState({bg_color_99: color});
                break;
        }
    },

    render(){
        return (<div><table>
            <tbody>
                <tr>
                    <th onClick={() => this.onSquareClicked(0)} style={{backgroundColor:this.state.bg_color_0}} className={this.state.hit_0}></th>
                    <th onClick={() => this.onSquareClicked(1)} style={{backgroundColor:this.state.bg_color_1}} className={this.state.hit_1}></th>
                    <th onClick={() => this.onSquareClicked(2)} style={{backgroundColor:this.state.bg_color_2}} className={this.state.hit_2}></th>
                    <th onClick={() => this.onSquareClicked(3)} style={{backgroundColor:this.state.bg_color_3}} className={this.state.hit_3}></th>
                    <th onClick={() => this.onSquareClicked(4)} style={{backgroundColor:this.state.bg_color_4}} className={this.state.hit_4}></th>
                    <th onClick={() => this.onSquareClicked(5)} style={{backgroundColor:this.state.bg_color_5}} className={this.state.hit_5}></th>
                    <th onClick={() => this.onSquareClicked(6)} style={{backgroundColor:this.state.bg_color_6}} className={this.state.hit_6}></th>
                    <th onClick={() => this.onSquareClicked(7)} style={{backgroundColor:this.state.bg_color_7}} className={this.state.hit_7}></th>
                    <th onClick={() => this.onSquareClicked(8)} style={{backgroundColor:this.state.bg_color_8}} className={this.state.hit_8}></th>
                    <th onClick={() => this.onSquareClicked(9)} style={{backgroundColor:this.state.bg_color_9}} className={this.state.hit_9}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(10)} style={{backgroundColor:this.state.bg_color_10}} className={this.state.hit_10}></th>
                    <th onClick={() => this.onSquareClicked(11)} style={{backgroundColor:this.state.bg_color_11}} className={this.state.hit_11}></th>
                    <th onClick={() => this.onSquareClicked(12)} style={{backgroundColor:this.state.bg_color_12}} className={this.state.hit_12}></th>
                    <th onClick={() => this.onSquareClicked(13)} style={{backgroundColor:this.state.bg_color_13}} className={this.state.hit_13}></th>
                    <th onClick={() => this.onSquareClicked(14)} style={{backgroundColor:this.state.bg_color_14}} className={this.state.hit_14}></th>
                    <th onClick={() => this.onSquareClicked(15)} style={{backgroundColor:this.state.bg_color_15}} className={this.state.hit_15}></th>
                    <th onClick={() => this.onSquareClicked(16)} style={{backgroundColor:this.state.bg_color_16}} className={this.state.hit_16}></th>
                    <th onClick={() => this.onSquareClicked(17)} style={{backgroundColor:this.state.bg_color_17}} className={this.state.hit_17}></th>
                    <th onClick={() => this.onSquareClicked(18)} style={{backgroundColor:this.state.bg_color_18}} className={this.state.hit_18}></th>
                    <th onClick={() => this.onSquareClicked(19)} style={{backgroundColor:this.state.bg_color_19}} className={this.state.hit_19}></th>
                </tr> 
                <tr>
                    <th onClick={() => this.onSquareClicked(20)} style={{backgroundColor:this.state.bg_color_20}} className={this.state.hit_20}></th>
                    <th onClick={() => this.onSquareClicked(21)} style={{backgroundColor:this.state.bg_color_21}} className={this.state.hit_21}></th>
                    <th onClick={() => this.onSquareClicked(22)} style={{backgroundColor:this.state.bg_color_22}} className={this.state.hit_22}></th>
                    <th onClick={() => this.onSquareClicked(23)} style={{backgroundColor:this.state.bg_color_23}} className={this.state.hit_23}></th>
                    <th onClick={() => this.onSquareClicked(24)} style={{backgroundColor:this.state.bg_color_24}} className={this.state.hit_24}></th>
                    <th onClick={() => this.onSquareClicked(25)} style={{backgroundColor:this.state.bg_color_25}} className={this.state.hit_25}></th>
                    <th onClick={() => this.onSquareClicked(26)} style={{backgroundColor:this.state.bg_color_26}} className={this.state.hit_26}></th>
                    <th onClick={() => this.onSquareClicked(27)} style={{backgroundColor:this.state.bg_color_27}} className={this.state.hit_27}></th>
                    <th onClick={() => this.onSquareClicked(28)} style={{backgroundColor:this.state.bg_color_28}} className={this.state.hit_28}></th>
                    <th onClick={() => this.onSquareClicked(29)} style={{backgroundColor:this.state.bg_color_29}} className={this.state.hit_29}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(30)} style={{backgroundColor:this.state.bg_color_30}} className={this.state.hit_30}></th>
                    <th onClick={() => this.onSquareClicked(31)} style={{backgroundColor:this.state.bg_color_31}} className={this.state.hit_31}></th>
                    <th onClick={() => this.onSquareClicked(32)} style={{backgroundColor:this.state.bg_color_32}} className={this.state.hit_32}></th>
                    <th onClick={() => this.onSquareClicked(33)} style={{backgroundColor:this.state.bg_color_33}} className={this.state.hit_33}></th>
                    <th onClick={() => this.onSquareClicked(34)} style={{backgroundColor:this.state.bg_color_34}} className={this.state.hit_34}></th>
                    <th onClick={() => this.onSquareClicked(35)} style={{backgroundColor:this.state.bg_color_35}} className={this.state.hit_35}></th>
                    <th onClick={() => this.onSquareClicked(36)} style={{backgroundColor:this.state.bg_color_36}} className={this.state.hit_36}></th>
                    <th onClick={() => this.onSquareClicked(37)} style={{backgroundColor:this.state.bg_color_37}} className={this.state.hit_37}></th>
                    <th onClick={() => this.onSquareClicked(38)} style={{backgroundColor:this.state.bg_color_38}} className={this.state.hit_38}></th>
                    <th onClick={() => this.onSquareClicked(39)} style={{backgroundColor:this.state.bg_color_39}} className={this.state.hit_39}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(40)} style={{backgroundColor:this.state.bg_color_40}} className={this.state.hit_40}></th>
                    <th onClick={() => this.onSquareClicked(41)} style={{backgroundColor:this.state.bg_color_41}} className={this.state.hit_41}></th>
                    <th onClick={() => this.onSquareClicked(42)} style={{backgroundColor:this.state.bg_color_42}} className={this.state.hit_42}></th>
                    <th onClick={() => this.onSquareClicked(43)} style={{backgroundColor:this.state.bg_color_43}} className={this.state.hit_43}></th>
                    <th onClick={() => this.onSquareClicked(44)} style={{backgroundColor:this.state.bg_color_44}} className={this.state.hit_44}></th>
                    <th onClick={() => this.onSquareClicked(45)} style={{backgroundColor:this.state.bg_color_45}} className={this.state.hit_45}></th>
                    <th onClick={() => this.onSquareClicked(46)} style={{backgroundColor:this.state.bg_color_46}} className={this.state.hit_46}></th>
                    <th onClick={() => this.onSquareClicked(47)} style={{backgroundColor:this.state.bg_color_47}} className={this.state.hit_47}></th>
                    <th onClick={() => this.onSquareClicked(48)} style={{backgroundColor:this.state.bg_color_48}} className={this.state.hit_48}></th>
                    <th onClick={() => this.onSquareClicked(49)} style={{backgroundColor:this.state.bg_color_49}} className={this.state.hit_49}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(50)} style={{backgroundColor:this.state.bg_color_50}} className={this.state.hit_50}></th>
                    <th onClick={() => this.onSquareClicked(51)} style={{backgroundColor:this.state.bg_color_51}} className={this.state.hit_51}></th>
                    <th onClick={() => this.onSquareClicked(52)} style={{backgroundColor:this.state.bg_color_52}} className={this.state.hit_52}></th>
                    <th onClick={() => this.onSquareClicked(53)} style={{backgroundColor:this.state.bg_color_53}} className={this.state.hit_53}></th>
                    <th onClick={() => this.onSquareClicked(54)} style={{backgroundColor:this.state.bg_color_54}} className={this.state.hit_54}></th>
                    <th onClick={() => this.onSquareClicked(55)} style={{backgroundColor:this.state.bg_color_55}} className={this.state.hit_55}></th>
                    <th onClick={() => this.onSquareClicked(56)} style={{backgroundColor:this.state.bg_color_56}} className={this.state.hit_56}></th>
                    <th onClick={() => this.onSquareClicked(57)} style={{backgroundColor:this.state.bg_color_57}} className={this.state.hit_57}></th>
                    <th onClick={() => this.onSquareClicked(58)} style={{backgroundColor:this.state.bg_color_58}} className={this.state.hit_58}></th>
                    <th onClick={() => this.onSquareClicked(59)} style={{backgroundColor:this.state.bg_color_59}} className={this.state.hit_59}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(60)} style={{backgroundColor:this.state.bg_color_60}} className={this.state.hit_60}></th>
                    <th onClick={() => this.onSquareClicked(61)} style={{backgroundColor:this.state.bg_color_61}} className={this.state.hit_61}></th>
                    <th onClick={() => this.onSquareClicked(62)} style={{backgroundColor:this.state.bg_color_62}} className={this.state.hit_62}></th>
                    <th onClick={() => this.onSquareClicked(63)} style={{backgroundColor:this.state.bg_color_63}} className={this.state.hit_63}></th>
                    <th onClick={() => this.onSquareClicked(64)} style={{backgroundColor:this.state.bg_color_64}} className={this.state.hit_64}></th>
                    <th onClick={() => this.onSquareClicked(65)} style={{backgroundColor:this.state.bg_color_65}} className={this.state.hit_65}></th>
                    <th onClick={() => this.onSquareClicked(66)} style={{backgroundColor:this.state.bg_color_66}} className={this.state.hit_66}></th>
                    <th onClick={() => this.onSquareClicked(67)} style={{backgroundColor:this.state.bg_color_67}} className={this.state.hit_67}></th>
                    <th onClick={() => this.onSquareClicked(68)} style={{backgroundColor:this.state.bg_color_68}} className={this.state.hit_68}></th>
                    <th onClick={() => this.onSquareClicked(69)} style={{backgroundColor:this.state.bg_color_69}} className={this.state.hit_69}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(70)} style={{backgroundColor:this.state.bg_color_70}} className={this.state.hit_70}></th>
                    <th onClick={() => this.onSquareClicked(71)} style={{backgroundColor:this.state.bg_color_71}} className={this.state.hit_71}></th>
                    <th onClick={() => this.onSquareClicked(72)} style={{backgroundColor:this.state.bg_color_72}} className={this.state.hit_72}></th>
                    <th onClick={() => this.onSquareClicked(73)} style={{backgroundColor:this.state.bg_color_73}} className={this.state.hit_73}></th>
                    <th onClick={() => this.onSquareClicked(74)} style={{backgroundColor:this.state.bg_color_74}} className={this.state.hit_74}></th>
                    <th onClick={() => this.onSquareClicked(75)} style={{backgroundColor:this.state.bg_color_75}} className={this.state.hit_75}></th>
                    <th onClick={() => this.onSquareClicked(76)} style={{backgroundColor:this.state.bg_color_76}} className={this.state.hit_76}></th>
                    <th onClick={() => this.onSquareClicked(77)} style={{backgroundColor:this.state.bg_color_77}} className={this.state.hit_77}></th>
                    <th onClick={() => this.onSquareClicked(78)} style={{backgroundColor:this.state.bg_color_78}} className={this.state.hit_78}></th>
                    <th onClick={() => this.onSquareClicked(79)} style={{backgroundColor:this.state.bg_color_79}} className={this.state.hit_79}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(80)} style={{backgroundColor:this.state.bg_color_80}} className={this.state.hit_80}></th>
                    <th onClick={() => this.onSquareClicked(81)} style={{backgroundColor:this.state.bg_color_81}} className={this.state.hit_81}></th>
                    <th onClick={() => this.onSquareClicked(82)} style={{backgroundColor:this.state.bg_color_82}} className={this.state.hit_82}></th>
                    <th onClick={() => this.onSquareClicked(83)} style={{backgroundColor:this.state.bg_color_83}} className={this.state.hit_83}></th>
                    <th onClick={() => this.onSquareClicked(84)} style={{backgroundColor:this.state.bg_color_84}} className={this.state.hit_84}></th>
                    <th onClick={() => this.onSquareClicked(85)} style={{backgroundColor:this.state.bg_color_85}} className={this.state.hit_85}></th>
                    <th onClick={() => this.onSquareClicked(86)} style={{backgroundColor:this.state.bg_color_86}} className={this.state.hit_86}></th>
                    <th onClick={() => this.onSquareClicked(87)} style={{backgroundColor:this.state.bg_color_87}} className={this.state.hit_87}></th>
                    <th onClick={() => this.onSquareClicked(88)} style={{backgroundColor:this.state.bg_color_88}} className={this.state.hit_88}></th>
                    <th onClick={() => this.onSquareClicked(89)} style={{backgroundColor:this.state.bg_color_89}} className={this.state.hit_89}></th>
                </tr>
                <tr>
                    <th onClick={() => this.onSquareClicked(90)} style={{backgroundColor:this.state.bg_color_90}} className={this.state.hit_90}></th>
                    <th onClick={() => this.onSquareClicked(91)} style={{backgroundColor:this.state.bg_color_91}} className={this.state.hit_91}></th>
                    <th onClick={() => this.onSquareClicked(92)} style={{backgroundColor:this.state.bg_color_92}} className={this.state.hit_92}></th>
                    <th onClick={() => this.onSquareClicked(93)} style={{backgroundColor:this.state.bg_color_93}} className={this.state.hit_93}></th>
                    <th onClick={() => this.onSquareClicked(94)} style={{backgroundColor:this.state.bg_color_94}} className={this.state.hit_94}></th>
                    <th onClick={() => this.onSquareClicked(95)} style={{backgroundColor:this.state.bg_color_95}} className={this.state.hit_95}></th>
                    <th onClick={() => this.onSquareClicked(96)} style={{backgroundColor:this.state.bg_color_96}} className={this.state.hit_96}></th>
                    <th onClick={() => this.onSquareClicked(97)} style={{backgroundColor:this.state.bg_color_97}} className={this.state.hit_97}></th>
                    <th onClick={() => this.onSquareClicked(98)} style={{backgroundColor:this.state.bg_color_98}} className={this.state.hit_98}></th>
                    <th onClick={() => this.onSquareClicked(99)} style={{backgroundColor:this.state.bg_color_99}} className={this.state.hit_99}></th>
                </tr>
            </tbody>
        </table>
        { (this.state.state_ship_5 == 0) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You must position the 5-block-ship</div> : 
        (this.state.state_ship_5 == 1) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You are positioning the 5-block-ship</div> : 
        (this.state.state_ship_4 == 0) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You must position the 4-block-ship</div> : 
        (this.state.state_ship_4 == 1) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You are positioning the 4-block-ship</div> : 
        (this.state.state_ship_3_1 == 0) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You must position one of the 3-block-ships</div> : 
        (this.state.state_ship_3_1 == 1) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You are positioning one of the 3-block-ships</div> : 
        (this.state.state_ship_3_2 == 0) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You must position the second 3-block-ship</div> : 
        (this.state.state_ship_3_2 == 1) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You are positioning the second 3-block-ship</div> : 
        (this.state.state_ship_2 == 0) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You must position the 2-block-ship</div> : 
        (this.state.state_ship_2 == 1) && (this.props.my_grid == "true") ? <div className="messageMyGrid">You are positioning the 2-block-ship</div> : 
        (this.props.my_grid == "true") ? <div className="messageMyGrid">You have positioned all of the ships!</div> : null }
        </div>);
    },

});

export default Grid