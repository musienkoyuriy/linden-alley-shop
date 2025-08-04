ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sku" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "category_id";