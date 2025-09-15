
/**
 * Application configuration settings.
 * Reads values from environment variables with defaults.
 * Includes server port, environment, CORS settings, and API metadata.
 * Used by the ConfigModule to provide configuration throughout the application.
 */
export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    api: {
        version: '1.0',
        title: 'Item Comparison API',
        description: 'RESTful API for product item comparison',
    },
})