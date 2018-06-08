import React from 'react';
import { Text, View, Image, ScrollView, FlatList, Linking, TouchableWithoutFeedback, Animated, PanResponder, Dimensions, StatusBar, } from 'react-native';
import Hr from '../../components/hr';
import { connect } from 'react-redux';
import randomizeItem from '../../actions/splashscreen';
import { Icon } from 'react-native-elements'

const styles = {
    h1: {
        fontWeight: 'bold',
        fontSize: 18
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    infosItem: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: 'red'
    }
}

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            test: new Animated.ValueXY(),
            pan: new Animated.ValueXY(),
            scroll: true,
            currentPosition: 0
        };
    }

    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => {
                return false;
            },
            onPanResponderMove: (evt, gestureState) => {
                //if (this.state.currentPosition === 0) {
                Animated.event([
                    null, { dx: 0, dy: this.state.pan.y }
                ])(evt, gestureState);
                //}
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                console.log(gestureState.dx != 0 && gestureState.dy != 0);
                return gestureState.dx != 0 && gestureState.dy != 0;
            },
            onPanResponderGrant: (e, gestureState) => {
                this.setState({ scroll: false });
                console.log(this.state.pan.y._value);
                // Set the initial value to the current state
                //let y = (this.state.pan.y._value < 0) ? 0 : this.state.pan.y._value;

                //this.setState({ scroll: false });
                this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });


            },
            onPanResponderRelease: (e, gesture) => {
                // slide down
                if (this.state.pan.y._value > 0) {
                    if (this.state.pan.y._value < 300) {
                        this.animateToTop();
                    }
                    else {
                        //this.setState({ scroll: false });
                        this.animateToBottom();
                    }
                }
                else {
                    //if (this.state.scroll) {
                    /*this.state.pan.setOffset({ x: 0, y: 0 });
                    this.state.pan.setValue({ x: 0, y: Dimensions.get('window').height - 80 + this.state.pan.y._value });
                    // }
                    if (this.state.pan.y._value > 200) {
                        this.animateToBottom();
                    }
                    else {
                        this.animateToTop();
                        //this.setState({ scroll: true });
                    }*/
                    /*}
                    else {*/
                    //this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
                    //this.state.pan.setValue({ x: 0, y: 0 });
                    //}
                }
            }
        });

        //this.state.pan.setOffset({ x: 0, y: Dimensions.get('window').height / 2 });
        this.state.pan.setValue({ x: 0, y: 0 });
    }

    getIcons() {
        return 'access-time';
    }

    animateToBottom() {
        this.state.map = true;
        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: Dimensions.get('window').height - 100 },
            //friction: 5,
            bounciness: 0
        }).start();

        this.setState({ scroll: false });
    }

    animateToTop() {
        this.state.map = false;
        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            //friction: 5,
            bounciness: 0
        }).start();

        this.setState({ scroll: true });
    }

    onPressMickey() {
        if (this.state.map) {
            this.animateToTop();
        }
        else {
            this.animateToBottom();
        }
    }

    render() {
        const { random, dispatch } = this.props;
        const { h1, h2, infosItem } = styles;
        const wHeight = Dimensions.get('window').height;
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };

        this.state.currentPosition = panStyle.transform[1].translateY._value;
        //console.log(panStyle.transform);

        const bottomViewStyle = {
            marginTop: this.state.pan.y.interpolate({
                inputRange: [0, 500],
                outputRange: [50, 75]
            })
        };

        const mapStyle = [{
            transform: [{
                translateY: this.state.pan.y.interpolate({
                    inputRange: [0, 500],
                    outputRange: [0, 135]
                })
            }]
        }];

        const overlayStyle = [{
            opacity: this.state.pan.y.interpolate({
                inputRange: [0, 250],
                outputRange: [0.5, 0]
            })
        }];

        //<View style={{ flex:1, backgroundColor: 'green' }}></View>
        //position: 'absolute',
        // paddingTop: StatusBar.currentHeight, 
        return (
            <View>
                <Animated.Image source={{uri:'http://www.magicbreaks.co.uk/Sites/MagicBreaks/Images/Disney-Map/new-disneyland-paris-map.jpg'}} style={[...mapStyle, { position: 'absolute', top: -150, left: 0, width: '100%', height: '100%' }]}></Animated.Image>
                <Animated.View style={[...overlayStyle, {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#4286f4'
                }]}></Animated.View>
                <Animated.View style={[panStyle, { width: '100%', position: 'absolute', zIndex: 3, alignItems: 'center', top: 20 }]}>
                    <View {...this.panResponder.panHandlers} style={{ backgroundColor: '#4286f4', height: 75, width: 75, borderRadius: 50 }}>
                        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { this.onPressMickey() }}><View style={{ width: 75, height: 75, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name='mouse'
                                color='white'
                            />
                        </View></TouchableWithoutFeedback>
                    </View>
                </Animated.View>
                <Animated.View style={[bottomViewStyle, panStyle, { alignItems: 'center' }]}>
                    <View {...this.panResponder.panHandlers} scrollEnabled={false} style={{ alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
                            <View>
                                <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 30 }}>
                                    <Text style={h1}>Bienvenue !</Text>
                                    <Text>à Disneyland Paris</Text>
                                </View>
                                <View style={{ height:200 }}>
                                    <Hr title='Information et accès aux Parcs' width={200} />
                                    <FlatList horizontal={true}
                                        style={{ flexDirection: 'row' }}
                                        showsHorizontalScrollIndicator={false}
                                        data={[{ key: 'access-time', title: 'Horaire des spectacles du jour' }, { key: 'date-range', title: 'Horaires des parcs' }, { key: 'local-offer', title: 'Acheter des billets' }, { key: 'phone', title: 'Appelez pour acheter vos billets' }, { key: 'free-breakfast', title: 'Réserver une table' }]}
                                        renderItem={({ item }) => {
                                            return (<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 15, height: 100, width: 150, ...item.key !== '5' ? { borderRightWidth: 1 } : {} }}>
                                                <Icon
                                                    name={item.key}
                                                    color='#517fa4'
                                                />
                                                <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.title}</Text></View>)
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ height:465}}>
                                    <Hr title='Lumière sur' />

                                    <View style={{ borderWidth: 1, margin: 20, borderRadius: 5 }}>
                                        <Image resizeMode={'cover'}
                                            style={{ width: '100%', height: 200 }}
                                            source={{ uri: 'http://www.univers-series.com/wp-content/uploads/2017/02/Walt_disney_pictures-750x400.jpg' }} />
                                        <View style={{ padding: 20 }}>
                                            <Text onPress={() => { this.props.navigation.navigate('About') }} style={{
                                                fontWeight: 'bold',
                                                fontSize: 24
                                            }}>Fêtez notre 25e Anniversaire avec des étoiles plein les yeux !</Text>
                                            <Text>En savoir plus ></Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'lightgray', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                                        <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>A propos & Réglement</Text>
                                        <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>Mentions légales</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View >
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Home);
