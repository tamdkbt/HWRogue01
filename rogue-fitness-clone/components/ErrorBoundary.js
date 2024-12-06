'use client';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#6E6E6E] flex items-center justify-center">
          <div className="text-white text-xl">
            Something went wrong. Please try again later.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 