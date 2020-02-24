import React from 'react';
import {isIphoneXorAbove, Dimens, Colors, Fonts} from '../utils/Theme';
import {Animated, View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

const width = '100%';
const height = '100%';

//Wrapper
const BOTTOM_PADDING = Dimens.ten;
const BOTTOM_PADDING_IPHONE_X = Dimens.thirty;

export default class TabBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prevPos: 2,
      pos: 2,
      width: 0,
      height: 0,
      animatedPos: new Animated.Value(2),
    };
  }

  animation = value =>
    Animated.spring(value, {
      toValue: 1,
    });

  componentDidMount() {
    const {index: activeRouteIndex} = this.props.navigation.state;
    this.animation(this.state.animatedPos).start(() => {
      this.setState({
        prevPos: activeRouteIndex,
      });
    });
  }

  render() {
    const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation,
    } = this.props;

    const {routes, index: activeRouteIndex} = navigation.state;

    let backgroundColor = '';
    let textColor = '';

    if (activeRouteIndex === 3) {
      backgroundColor = '#e0dcec';
      textColor = Colors.activityBackgroundColor;
    } else if (activeRouteIndex === 0) {
      backgroundColor = `#fdeec6`;
      textColor = Colors.rewardScreenBackground;
    } else if (activeRouteIndex === 2) {
      backgroundColor = `#fcd0f0`;
      textColor = Colors.dashBoardBackground;
    } else if (activeRouteIndex === 1) {
      backgroundColor = `#d0e9f6`;
      textColor = Colors.notificationBackgroundColor;
    } else if (activeRouteIndex === 4) {
      backgroundColor = `#daf8f9`;
      textColor = Colors.profileBackgroundColor;
    }

    return (
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          width: '100%',
          paddingBottom: isIphoneXorAbove()
            ? BOTTOM_PADDING_IPHONE_X
            : BOTTOM_PADDING,
          paddingTop: Dimens.ten,
          paddingHorizontal: Dimens.ten,
          backgroundColor: Dimens.black,
          shadow: true,
        }}
      >
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;

          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          const labelLength = getLabelText({route}).length;

          const tabHasIcon =
            renderIcon({route, focused: isRouteActive, tintColor}) != null;
          //Render Label if tab is selected or if there is no icon

          const renderLabel = () => {
            const label = (
              <Animated.Text
                style={{
                  fontSize: Dimens.eighteen,
                  color: textColor,
                  fontFamily: Fonts.SourceSansProSemibold,
                  marginLeft: Dimens.seven,
                }}
                icon={tabHasIcon}
                activeColor={textColor}
              >
                {getLabelText({route})}
              </Animated.Text>
            );
            if (isRouteActive) {
              return label;
            } else if (!isRouteActive && !tabHasIcon) {
              return label;
            } else {
              return;
            }
          };

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                borderRadius: Dimens.hundred,
                paddingHorizontal: Dimens.seven,
                paddingVertical: Dimens.ten,
                fontFamily: Fonts.SourceSansProSemibold,
                flexGrow: isRouteActive
                  ? labelLength / Dimens.ten + Dimens.two
                  : Dimens.one,
              }}
              icon={tabHasIcon}
              labelLength={labelLength}
              onLayout={event => {
                isRouteActive &&
                  this.setState({
                    pos: event.nativeEvent.layout.x,
                    width: event.nativeEvent.layout.width,
                    height: event.nativeEvent.layout.height,
                  });
              }}
              isRouteActive={isRouteActive}
              key={routeIndex}
              onPress={() => {
                if (!isRouteActive) {
                  this.animation(this.state.animatedPos).start(() => {
                    this.setState({
                      prevPos: activeRouteIndex,
                    });
                  });
                  onTabPress({route});
                }
              }}
              onLongPress={() => {
                if (!isRouteActive) {
                  this.animation(this.state.animatedPos).start(() => {
                    this.setState({
                      prevPos: activeRouteIndex,
                    });
                  });
                  onTabLongPress({route});
                }
              }}
              accessibilityLabel={getAccessibilityLabel({route})}
            >
              <View>
                {renderIcon({route, focused: isRouteActive, tintColor})}
              </View>

              {renderLabel()}
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={{
            position: 'absolute',
            top: Dimens.ten,
            height: this.state.height,
            alignItems: 'center',
            justifyContent: 'center',
            width: this.state.width,
            borderRadius: Dimens.hundred,
            backgroundColor: backgroundColor,
            zIndex: -Dimens.one,
            shadowOpacity: 0.05,
            shadowRadius: 20,
            left: this.state.animatedPos.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.prevPos, this.state.pos],
            }),
          }}
        />
      </View>
    );
  }
}
