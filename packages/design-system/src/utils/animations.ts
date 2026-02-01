import { Animated, Easing } from 'react-native';

// Fade animation
export function fadeIn(duration = 300): Animated.CompositeAnimation {
  const opacity = new Animated.Value(0);
  return Animated.timing(opacity, {
    toValue: 1,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
}

export function fadeOut(duration = 300): Animated.CompositeAnimation {
  const opacity = new Animated.Value(1);
  return Animated.timing(opacity, {
    toValue: 0,
    duration,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  });
}

// Slide animation
export function slideInUp(duration = 300): Animated.CompositeAnimation {
  const translateY = new Animated.Value(50);
  return Animated.timing(translateY, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
}

export function slideInDown(duration = 300): Animated.CompositeAnimation {
  const translateY = new Animated.Value(-50);
  return Animated.timing(translateY, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
}

export function slideInLeft(duration = 300): Animated.CompositeAnimation {
  const translateX = new Animated.Value(-50);
  return Animated.timing(translateX, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
}

export function slideInRight(duration = 300): Animated.CompositeAnimation {
  const translateX = new Animated.Value(50);
  return Animated.timing(translateX, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
}

export function slideOut(duration = 300): Animated.CompositeAnimation {
  const translateY = new Animated.Value(0);
  return Animated.timing(translateY, {
    toValue: 50,
    duration,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  });
}

// Scale animation
export function scaleIn(duration = 300): Animated.CompositeAnimation {
  const scale = new Animated.Value(0);
  return Animated.timing(scale, {
    toValue: 1,
    duration,
    easing: Easing.out(Easing.back(1.2)),
    useNativeDriver: true,
  });
}

export function scaleOut(duration = 300): Animated.CompositeAnimation {
  const scale = new Animated.Value(1);
  return Animated.timing(scale, {
    toValue: 0,
    duration,
    easing: Easing.in(Easing.back(1.2)),
    useNativeDriver: true,
  });
}

// Spring animation
export function springIn(
  tension = 50,
  friction = 7
): Animated.CompositeAnimation {
  const scale = new Animated.Value(0);
  return Animated.spring(scale, {
    toValue: 1,
    tension,
    friction,
    useNativeDriver: true,
  });
}

// Helper to create animated value
export function createAnimatedValue(initialValue = 0): Animated.Value {
  return new Animated.Value(initialValue);
}

