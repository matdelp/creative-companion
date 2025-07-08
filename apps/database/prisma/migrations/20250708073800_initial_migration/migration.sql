-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR,
    "picture" VARCHAR,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR,
    "description" VARCHAR,
    "content" VARCHAR NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prompt_id" INTEGER NOT NULL,

    CONSTRAINT "artwork_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artwork_has_tag" (
    "id" SERIAL NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "artwork_has_tag_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" SERIAL NOT NULL,
    "photo" VARCHAR NOT NULL,
    "photo_author" VARCHAR NOT NULL,
    "photo_promo" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inspiration_id" INTEGER NOT NULL,

    CONSTRAINT "prompt_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "tags_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "name" VARCHAR NOT NULL,
    "hex" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "color_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palette" (
    "id" SERIAL NOT NULL,
    "prompt_id" INTEGER NOT NULL,

    CONSTRAINT "palette_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "palette_has_color" (
    "id" SERIAL NOT NULL,
    "palette_id" INTEGER NOT NULL,
    "color_id" INTEGER NOT NULL,

    CONSTRAINT "palette_has_color_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspiration" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,

    CONSTRAINT "newtable_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_unique" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_unique_1" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tags_unique" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "color_unique" ON "color"("hex");

-- CreateIndex
CREATE UNIQUE INDEX "palette_unique" ON "palette"("prompt_id");

-- CreateIndex
CREATE UNIQUE INDEX "theme_unique" ON "inspiration"("name");

-- AddForeignKey
ALTER TABLE "artwork" ADD CONSTRAINT "artwork_prompt_fk" FOREIGN KEY ("prompt_id") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork" ADD CONSTRAINT "artwork_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artwork_has_tag" ADD CONSTRAINT "artwork_has_tag_artwork_fk" FOREIGN KEY ("artwork_id") REFERENCES "artwork"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "artwork_has_tag" ADD CONSTRAINT "artwork_has_tag_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_inspiration_fk" FOREIGN KEY ("inspiration_id") REFERENCES "inspiration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "palette" ADD CONSTRAINT "palette_prompt_fk" FOREIGN KEY ("prompt_id") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "palette_has_color" ADD CONSTRAINT "palette_has_color_color_fk" FOREIGN KEY ("color_id") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "palette_has_color" ADD CONSTRAINT "palette_has_color_palette_fk" FOREIGN KEY ("palette_id") REFERENCES "palette"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
