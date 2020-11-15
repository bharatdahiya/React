import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.20,
    bacon: 0.30,
    cheese: 0.10,
    meat: 0.50
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        isPurchasing: false
    }

    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, []);
        this.setState({ purchasable: sum > 0 })
    }

    isPurchasingHanlder = () => {
        this.setState({ isPurchasing: !this.state.isPurchasing });
    }

    purchaseCancelhandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        alert("You can continue");
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState();
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState();
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxiliary>
                {<Modal show={this.state.isPurchasing}
                    modalClosed={this.purchaseCancelhandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseCancelhandler}
                        purchaseContinue={this.purchaseContinueHandler} 
                        price={this.state.totalPrice}/>
                </Modal>}
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.isPurchasingHanlder} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;