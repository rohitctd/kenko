package in.kenkohealth.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import org.reactnative.camera.RNCameraPackage;
import com.razorpay.rn.RazorpayPackage;
import com.oblador.shimmer.RNShimmerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
          new RNDeviceInfo(), new ImagePickerPackage(),
          new ReactNativeOneSignalPackage(), new RNCameraPackage(), new RazorpayPackage(), new RNShimmerPackage(),
          new RNFirebasePackage(), new RNFirebaseAuthPackage(), new RNFirebaseNotificationsPackage(),
          new RNFirebaseStoragePackage(), new RNFirebaseAnalyticsPackage(), new MapsPackage(), new ReactVideoPackage(),
          new SvgPackage(), new SplashScreenReactPackage(), new NetInfoPackage(), new AsyncStoragePackage(),
          new RNGestureHandlerPackage(), new FastImageViewPackage(), new RNFirebaseMessagingPackage(),
          new VectorIconsPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
