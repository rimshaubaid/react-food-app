import React, { Component } from 'react';
import { saveDataToLocalStorage, saveDataToLocalStorage2, saveDataToLocalStorage3,savedComponentsBack, savedArticlesback, saveArticleToLocalStorage,selectedArticlesBackStorage,saveDataCalledComponentBack } from './SaveDataToLocalStorage';
import { getAvailableComponents } from '../actions/componentActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LocalizedMessage from './LocalizedMessage';
import CancelConfirmModal from './CancelConfirmModal';


import SavaeConfigarationChoiceModal from './SavaeConfigarationChoiceModal';

class Footer extends Component {

    state = {
        next: false,
        modalIsOpen: false
    }

    componentDidMount() {
        document.getElementById('errorMessage').style.display = 'none';
        window.updateFooterClass();
        // console.log('componentDidMount');
      //  this.props.location.state && console.log(this.props.location.state.componentName);
      //  this.props.location.state && console.log(this.props.match.params.product_id);

        let savedComponents = localStorage.savedComponents && JSON.parse(localStorage.getItem('savedComponents'));

        if (savedComponents) {
            
        }else{
            
        

            this.props.location.state && saveDataToLocalStorage3({'componentName': this.props.location.state.componentName, 'id': this.props.location.state.componentID, 'cardinality': this.props.match.params.cardinality && this.props.match.params.cardinality, 'product_id': this.props.match.params.product_id && this.props.match.params.product_id});

        }




    }

    getLinks = () => {


      //  console.log('get links');

      //  console.log(this.props.selectedComponent);

        this.setState({next: true});

        const {product_id} = this.props.params;

        // this.props.selectedComponent && this.props.selectedComponent.map(single => saveDataToLocalStorage(single));

        this.props.selectedComponent && saveDataToLocalStorage( this.props.match.params.cardinality && this.props.match.params.cardinality,this.props.allArticles, this.props.selectedComponent);

        this.props.selectedComponent && saveArticleToLocalStorage(this.props.allArticles, this.props.selectedComponent);


        const componentCardinality = this.props.cardinality;

        if ((componentCardinality === 'mandatory_single' || componentCardinality === 'mandatory_multi') && this.props.selectedComponent.length < 1) {
            document.getElementById('errorMessage').style.display = 'none';
            
        } else if (this.props.availableArticle) {

        
            let selectedArticlesIDs = [];

            let selectedArticles = JSON.parse(localStorage.getItem('selectedArticles'));
            selectedArticles && selectedArticles.map(single => selectedArticlesIDs.push({id: single.id}))


            const productModelEdtionID = localStorage.getItem('savedProductModelEditionID');



            productModelEdtionID && this.props.getAvailableComponents(product_id, selectedArticlesIDs, productModelEdtionID);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {available_components} = nextProps.component;
       // console.log('Footer__componentWillReceiveProps');

        if (available_components && this.state.next === true && available_components !== this.props.component.available_components) {
            if (this.props.availableArticle) {
                const {product_id, component_id} = nextProps.params;

                document.getElementById('errorMessage').style.display = 'none';

                let next_Component_ID, next_Component_Name, next_Component_Cardinality;

                if (available_components) {
                    let components = available_components.payLoad;

                    if (components) {
                        for (let i = 0; i <= components.length; i++) {

                            if (i === 0) {
                                saveDataToLocalStorage2(component_id);
                            }

                            let calledComponents = JSON.parse(localStorage.getItem('calledComponents'));

                            if (components[i] && calledComponents.includes(components[i].id) === false) {
                                next_Component_ID = components[i].id;
                                next_Component_Name = components[i].name;
                                next_Component_Cardinality = components[i].cardinalityKeyWord
                                break;
                            } else if (components[i] && calledComponents.includes(components[i].id) && i === components.length - 1) {
                                return this.props.history.push('/product-configuration');
                            }
                        }
                    }
                    let cardinalityCheck;
                    if (next_Component_Cardinality) {
                        if (next_Component_Cardinality === 'mandatory_single') {
                            cardinalityCheck = '1'
                        } else if (next_Component_Cardinality === 'mandatory_multi') {
                            cardinalityCheck = '2'
                        } else if (next_Component_Cardinality === 'optional_single') {
                            cardinalityCheck = '01'
                        } else if (next_Component_Cardinality === 'optional_multi') {
                            cardinalityCheck = '02'
                        }
                    }



                    saveDataToLocalStorage3({'componentName': next_Component_Name, 'id': next_Component_ID, 'cardinality': cardinalityCheck, 'product_id': product_id});

                    // console.log(next_Component_Name);

                    this.props.setState({selectedComponent: ''})
                    this.props.history.push(`/product/${product_id}/component/${next_Component_ID}/${cardinalityCheck}`, {componentName: next_Component_Name, componentID: next_Component_ID, cardinality: next_Component_Cardinality})
                }
            }
        }
    }

    saveConfiguration = () => {

        this.choice.openModal();

        // this.props.saveProductConfiguration();
    }
    
  

    goBack = () => {

        if (this.props.availableArticle || this.props.saveConfiguration) {
            let {component_id} = this.props.match.params;
            let component_name = this.props.componentName;

            const selectedArticles = JSON.parse(localStorage.getItem('selectedArticles'));
            const calledComponents = JSON.parse(localStorage.getItem('calledComponents'));





            calledComponents && calledComponents.map(single => saveDataToLocalStorage2(single));



            var cardinality = this.props.match.params.cardinality && this.props.match.params.cardinality;

            //  console.log(cardinality);

            if (cardinality) {
                const savedComponents = localStorage.savedComponents && JSON.parse(localStorage.getItem('savedComponents'));
                if (savedComponents) {
                    for (let i = 0; i <= savedComponents.length; i++) {
                        if (savedComponents[i] && savedComponents[i].id === component_id) {
                            savedComponents.splice(i);
                        }
                    }
    
                savedComponents &&  savedComponentsBack(savedComponents);
                }
              



                if (selectedArticles) {
                    for (let j = 0; j <= selectedArticles.length; j++) {
                        if (selectedArticles[j] && selectedArticles[j].componentName === component_name) {
                            selectedArticles.splice(j);
                        }
                    }
                    selectedArticles.pop();
                       selectedArticles && selectedArticlesBackStorage(selectedArticles);
              //  localStorage.removeItem('selectedArticles');
                }

             


                if (calledComponents) {
                    for (let k = 0; k <= calledComponents.length; k++) {
                        if (calledComponents[k] && calledComponents[k] === component_id) {
                            calledComponents.splice(k);
                        }
                    }
                    calledComponents.pop();
                    
                    
                    calledComponents && saveDataCalledComponentBack(calledComponents);
                    
                   // localStorage.removeItem('calledComponents');
                }
                
                
                  const savedarticels = JSON.parse(localStorage.getItem('savedArticles'));
                
                  if (savedarticels) {
                    for (let k = 0; k <= savedarticels.length; k++) {
                        if (savedarticels[k] && savedarticels[k] === component_id) {
                            savedarticels.splice(k);
                        }
                    }
                    savedarticels.pop();
                    savedarticels && savedArticlesback(savedarticels);
                   // localStorage.removeItem('calledComponents');
                }
                
                

            }

        }

        this.props.history.goBack();
    }
     closeModal = () => {
        this.setState({modalIsOpen: false});
    }


    render() {
        return (
                <div className="footer pb-xs-5 pb-sm-5 pb-lg-1 pb-xl-1 sticky-footer" >

                        <div className="container-fluid">
                            <div className="row py-lg-5">
                                <div className="col-lg-6  	d-none d-lg-block d-xl-block">
                                        
                                            <button type="reset" onClick={() => {this.confirm.openModal();  this.closeModal()}}  className="btn btn-light  cu-light" ><LocalizedMessage messageKey="button.cancel" /></button>
                                      
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="row">
                           
                                
                                   <div className="col-lg-6 col-6">
                                        {localStorage.calledComponents && (this.props.availableArticle || this.props.saveConfiguration) &&

                                                <button type="reset" className="btn btn-light  cu-light" onClick={this.goBack}><LocalizedMessage messageKey="button.back" /></button>

                                        }
                                    </div>
                                    <span id="errorMessage" style={{display: 'none'}}>
                                        <h5 className="text-danger"> Please select any article. It's mandatory. </h5>
                                    </span>
                                        <div className="col-lg-6 col-6 text-right">
                                            <button
                                                className="btn btn-light float-right cu-light   " 

                                                disabled={(this.props.match.params.cardinality === '1' || this.props.match.params.cardinality === '2') && this.props.selectedComponent.length < 1}
                                                onClick={this.props.saveConfiguration ? this.saveConfiguration : this.getLinks}
                                                >
                                                {this.props.saveConfiguration ?
                                                <React.Fragment><LocalizedMessage messageKey="button.ok" /></React.Fragment> :
                                                <LocalizedMessage messageKey="button.next" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                 
                    <SavaeConfigarationChoiceModal       saveProductConfiguration={this.props.saveProductConfiguration} onRef={ref => this.choice = ref}   />
                    <CancelConfirmModal onRef={ref => this.confirm = ref} />
                </div>
                    )
        }
    }

    const mapStateToProps = state => ({
            component: state.component
        })

    export default (withRouter(connect(mapStateToProps, {getAvailableComponents})(Footer)));
